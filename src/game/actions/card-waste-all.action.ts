import { GameState } from '../logic/engine';
import { GameAction, ResponseActions } from './game-actions';
import { GameUiState } from './ui-actions';

export class CardWasteAllAction implements GameAction {
  update(state: GameUiState): GameUiState {
    return {
      ...state,
      cards: [],
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
