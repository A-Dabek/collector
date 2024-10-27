import { GameState } from '../logic/engine';
import { GameAction, ResponseActions } from './game-actions';
import { GameUiState } from './ui-actions';
import { Card } from '../library/access';

export class CardPlayAction implements GameAction {
  private readonly ids: number[];

  constructor(cards: Card[]) {
    this.ids = cards.map((card: Card) => card.id);
  }

  update(state: GameUiState): GameUiState {
    return {
      ...state,
      cards: state.cards.filter((card) => !this.ids.includes(card.id)),
    };
  }

  next(state: GameState): ResponseActions {
    return {
      nextState: this.update(state),
      uiActions: [this],
      persistenceActions: [],
    };
  }
}
