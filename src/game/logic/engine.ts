import { BehaviorSubject, firstValueFrom, Subject } from 'rxjs';
import { GameAction } from '../actions/game-actions';
import { GameUiState } from '../actions/ui-actions';
import { CardName } from '../cards/access';
import { GameCard } from '../cards/card';
import { GameEffect } from '../effects/effect';
import { findCardInLibrary } from '../library/access';

export type GameMode = 'play' | 'target'; //TODO | 'options';

export interface GameState {
  points: number;
  maxPoints: number;
  health: number;
  maxHealth: number;
  space: number;
  cards: GameCard[];
  effects: GameEffect[];
  cardHistory: CardName[];
  autoPlayQueue: CardName[];
  mode: GameMode;
  modeTarget?: {
    source: GameCard;
    candidateIds: number[];
    count: number;
  };
}

export class GameEngine {
  static readonly initialState: GameState = {
    points: 0,
    maxPoints: 10,
    health: 0,
    maxHealth: 10,
    space: 5,
    cards: [],
    effects: [],
    cardHistory: [],
    autoPlayQueue: [],
    mode: 'play',
  };

  private state = GameEngine.initialState;

  private readonly _snapshots$ = new BehaviorSubject<GameUiState>(
    this.createSnapshot(),
  );
  readonly snapshots$ = this._snapshots$.asObservable();
  readonly targetReady$ = new Subject<{ ids: number[] }>();

  playCard(card: GameCard) {
    this.applyCardActions(card).then();
  }

  playCardId(id: number) {
    const card = this.state.cards.find((card) => card.id === id) as GameCard;
    this.playCard(card);
  }

  private publishCurrentSnapshot() {
    const snapshot = this.createSnapshot();
    console.debug('[ENGINE] Snapshot', snapshot);
    this._snapshots$.next(snapshot);
  }

  private async waitForTargets() {
    const targets = await firstValueFrom(this.targetReady$);
    this.state.mode = 'play';
    this.state.modeTarget = undefined;
    return targets.ids.map(
      (id) => this.state.cards.find((card) => card.id === id)!,
    );
  }

  private async applyCardActions(card: GameCard) {
    if (!card || !card.enabled(this.state) || card.isWasted) {
      console.warn('[ENGINE] Cannot play', card, {
        enabled: card?.enabled(this.state),
        isWasted: card?.isWasted,
      });
      this.state.autoPlayQueue = [];
      return;
    }

    const actions = card.play(this.state);

    let nextAction = actions.shift();
    while (nextAction) {
      const newActions = await this.applyCardAction(card, nextAction);
      actions.unshift(...newActions);
      nextAction = actions.shift();
    }

    await this.playAutoPlayQueue();
  }

  private async applyCardAction(
    card: GameCard,
    action: GameAction,
  ): Promise<GameAction[]> {
    console.debug('[ENGINE] Processing', card, action);
    const postEffectActions = this.applyEffectsToAction(card, action);
    console.debug('[ENGINE] Post effects', postEffectActions);
    this.applyActionToState(action);
    this.publishCurrentSnapshot();
    const reactions = this.reactToAction(action);
    console.debug('[ENGINE] Reactions', reactions);
    const additionalActions = [...postEffectActions, ...reactions];
    this.state.cards = this.state.cards.filter((card) => !card.isWasted);
    if (this.state.mode === 'target') {
      const targets = await this.waitForTargets();
      const targetActions = card.target!(this.state, targets);
      console.debug('[ENGINE] Target actions', targetActions);
      // How to modify the target actions? should an effect overwrite mode to 'play'?
      return [...targetActions, ...additionalActions];
    }
    return additionalActions;
  }

  private applyEffectsToAction(card: GameCard, action: GameAction) {
    return this.state.effects.flatMap((effect) =>
      effect.apply(this.state, card, action),
    );
  }

  private applyActionToState(action: GameAction) {
    this.state = action.next(this.state);
  }

  private createSnapshot(): GameUiState {
    return {
      ...this.state,
      cards: this.state.cards
        .filter((card) => !card.isWasted)
        .map((card) => card.serialize(this.state)),
      effects: this.state.effects.map((effect) => effect.serialize(this.state)),
    };
  }

  private reactToAction(action: GameAction): GameAction[] {
    return this.state.cards.flatMap((card) => {
      if (!card.onAction) return [];
      return card.onAction(this.state, action);
    });
  }

  private async playAutoPlayQueue() {
    while (this.state.autoPlayQueue.length > 0) {
      const cardName = this.state.autoPlayQueue.shift() as CardName;
      const card = findCardInLibrary(cardName);
      await this.applyCardActions(card);
    }
  }
}
