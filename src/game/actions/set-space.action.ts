import { GameState } from '../logic/engine';
import { GameAction, ResponseActions } from './game-actions';
import { GameUiState } from './ui-actions';

export class SetSpaceAction implements GameAction {
  constructor(private readonly value: number) {}

  update(state: GameUiState): GameUiState {
    return {
      ...state,
      space: this.value,
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
