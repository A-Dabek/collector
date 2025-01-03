import { GameAction } from '../actions/game-actions';
import { GameUiState } from '../actions/ui-actions';
import { PlayableCard } from '../cards/card';
import { FinishGameCard } from '../cards/finish-game.card';
import { NewGameCard } from '../cards/new-game.card';

export interface GameState {
  points: number;
  maxPoints: number;
  health: number;
  maxHealth: number;
  space: number;
  cards: PlayableCard[];
}

export class GameEngine {
  static readonly initialState: GameState = {
    points: 0,
    maxPoints: 10,
    health: 0,
    maxHealth: 10,
    space: 5,
    cards: [],
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
    const card = this.state.cards.find((card) => card.id === id);
    if (!card || !card.enabled) {
      throw new Error('Card not found or not enabled');
    }

    // if (!card.targetSource && card.target) {
    //   return this.playCard({
    //     next: (state) => card.target!(state, card),
    //   });
    // } else {
    return this.playCard(card);
    // }
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

  private playCard(playable: PlayableCard): GameUiState[] {
    const actions = playable.play(this.state);
    const reactions = this.reactToActions(actions);
    console.log({ actions });
    console.log({ reactions });
    return reactions.map((reaction) => {
      this.state = reaction.next(this.state);
      console.log(reaction, this.state);
      return {
        ...this.state,
        cards: this.state.cards.map((card) => card.serialize(this.state)),
      };
    });
  }

  private reactToActions(actions: GameAction[]): GameAction[] {
    const reactions = actions.flatMap((action) => {
      return this.reactToAction(action);
    });
    if (reactions.length > 0) {
      // react to reactions recursively
      return [...actions, ...this.reactToActions(reactions)];
    }
    return actions;
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
