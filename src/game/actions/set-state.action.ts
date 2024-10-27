import { GameState } from '../logic/engine';
import { GameAction, ResponseActions } from './game-actions';
import { GameUiState } from './ui-actions';

export class SetStateAction implements GameAction {
  constructor(private readonly state: GameState) {}

  update(_: GameUiState): GameUiState {
    return {
      ...this.state,
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
