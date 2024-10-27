import { GameState } from '../logic/engine';
import { GameAction, ResponseActions } from './game-actions';
import { GameUiState } from './ui-actions';
import { Card } from '../library/access';

export class CardAddAction implements GameAction {
  constructor(private readonly cards: Card[]) {}

  update(state: GameUiState): GameUiState {
    return {
      ...state,
      cards: [...state.cards, ...this.cards],
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
