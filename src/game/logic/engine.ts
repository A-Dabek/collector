import { signal } from '@angular/core';
import { BehaviorSubject, firstValueFrom, Observable, Subject } from 'rxjs';
import { GameAction } from '../actions/game-actions';
import { TargetStartAction } from '../actions/target-start.action';
import { GameUiState } from '../actions/ui-actions';
import { CardName } from '../cards/access';
import { GameCard } from '../cards/card';
import { FinishGameCard } from '../cards/finish-game.card';
import { NewGameCard } from '../cards/new-game.card';
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

  private readonly _snapshots$ = new BehaviorSubject<GameUiState[]>([]);
  readonly snapshots$ = this._snapshots$.asObservable();
  readonly targetReady$ = new Subject<{ ids: number[] }>();

  startNewGame(level: number) {
    const newGame = new NewGameCard(level);
    this.playCard(newGame);
  }

  finishCurrentGame() {
    const finishGame = new FinishGameCard();
    this.playCard(finishGame);
  }

  play(id: number) {
    const card = this.state.cards.find((card) => card.id === id) as GameCard;
    this.playCard(card);
  }

  private async playCard(card: GameCard) {
    if (!card || !card.enabled(this.state)) {
      console.warn('Card not found or not enabled', card);
      this.state.autoPlayQueue = [];
      return;
    }

    let actions = card.play(this.state);
    const targetAction = actions.findIndex(
      (action) => action instanceof TargetStartAction,
    );

    if (targetAction >= 0) {
      const preTargetActions = actions.slice(0, targetAction + 1);
      const snapshots = this.applyActions(preTargetActions);
      this._snapshots$.next(snapshots);

      const targets = await this.waitForTarget();
      const postTargetActions = actions.slice(targetAction + 1);
      actions = [...postTargetActions, ...card.target!(this.state, targets)];
    }

    const postEffectActions = this.applyEffects(card, actions);
    const reactions = this.reactToActions(postEffectActions);

    const snapshots = this.applyActions([...postEffectActions, ...reactions]);

    this._snapshots$.next(snapshots);
    await this.playAutoPlayQueue();
  }

  private async waitForTarget() {
    const targets = await firstValueFrom(this.targetReady$);
    const targetCards = targets.ids.map(
      (id) => this.state.cards.find((card) => card.id === id)!,
    );
    this.state.mode = 'play';
    this.state.modeTarget = undefined;
    return targetCards;
  }

  private async playAutoPlayQueue() {
    while (this.state.autoPlayQueue.length > 0) {
      const cardName = this.state.autoPlayQueue.shift() as CardName;
      const card = findCardInLibrary(cardName);
      await this.playCard(card);
    }
  }

  private applyActions(actions: GameAction[]): GameUiState[] {
    return actions.map((reaction) => {
      this.state = reaction.next(this.state);
      return {
        ...this.state,
        cards: this.state.cards.map((card) => card.serialize(this.state)),
        effects: this.state.effects.map((effect) =>
          effect.serialize(this.state),
        ),
      };
    });
  }

  private applyEffects(card: GameCard, actions: GameAction[]) {
    return this.state.effects.reduce(
      (finalActions, effect) => effect.apply(this.state, finalActions, card),
      actions,
    );
  }

  private reactToActions(actions: GameAction[]): GameAction[] {
    const reactions = actions.flatMap((action) => {
      return this.reactToAction(action);
    });
    if (reactions.length > 0) {
      // react to reactions recursively
      return [...reactions, ...this.reactToActions(reactions)];
    }
    return [];
  }

  private reactToAction(action: GameAction): GameAction[] {
    return this.state.cards.flatMap((card) => {
      if (!card.onAction) return [];
      return card.onAction(this.state, action);
    });
  }
}
