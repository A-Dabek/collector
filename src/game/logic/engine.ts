import { GameAction } from '../actions/game-actions';
import { GameUiState } from '../actions/ui-actions';
import { CardName } from '../cards/access';
import { GameCard } from '../cards/card';
import { FinishGameCard } from '../cards/finish-game.card';
import { NewGameCard } from '../cards/new-game.card';
import { GameEffect } from '../effects/effect';
import { findCardInLibrary } from '../library/access';

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
  };

  private state = GameEngine.initialState;

  startNewGame(level: number): GameUiState[] {
    const newGame = new NewGameCard(level);
    return this.playCard(newGame);
  }

  finishCurrentGame(): GameUiState[] {
    const finishGame = new FinishGameCard();
    return this.playCard(finishGame);
  }

  play(id: number): GameUiState[] {
    const card = this.state.cards.find((card) => card.id === id) as GameCard;
    return this.playCard(card);
  }

  target(id: number): GameUiState[] {
    const card = this.state.cards.find((card) => card.id === id);
    // const targetingCard = this.state.cards.find((card) => card.targetSource);
    // if (!card || !targetingCard) {
    //   return this.playCard(new SetStateAction(this.state));
    // }
    // const playableCard = PLAYABLE_LIBRARY[targetingCard.name];
    // return this.playCard(
    //   new CardTargetAction(card, targetingCard, playableCard),
    // );
    throw new Error('Not implemented');
  }

  private playCard(card: GameCard): GameUiState[] {
    if (!card || !card.enabled(this.state)) {
      console.warn('Card not found or not enabled', card);
      this.state.autoPlayQueue = [];
      return [];
    }

    const actions = card.play(this.state);
    const postEffectActions = this.applyEffects(card, actions);
    const reactions = this.reactToActions(postEffectActions);

    const snapshots = this.applyActions([...postEffectActions, ...reactions]);
    snapshots.push(...this.playAutoPlayQueue());
    return snapshots;
  }

  private playAutoPlayQueue(): GameUiState[] {
    const snapshots: GameUiState[] = [];
    while (this.state.autoPlayQueue.length > 0) {
      const cardName = this.state.autoPlayQueue.shift() as CardName;
      const card = findCardInLibrary(cardName);
      snapshots.push(...this.playCard(card));
    }
    return snapshots;
  }

  private applyActions(actions: GameAction[]): GameUiState[] {
    return actions.map((reaction) => {
      this.state = reaction.next(this.state);
      console.log(reaction, this.state);
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
      if (!card.onAction) {
        return [];
      }
      return card.onAction(this.state, action);
    });
  }
}
