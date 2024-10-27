import { GameState } from '../logic/engine';
import { GameAction, ResponseActions } from './game-actions';
import { GameUiState } from './ui-actions';
import { SetSpaceAction } from './set-space.action';

export class AddSpaceAction implements GameAction {
  constructor(private readonly increment: number) {}

  update(state: GameUiState): GameUiState {
    return new SetSpaceAction(state.space + this.increment).update(state);
  }

  next(state: GameState): ResponseActions {
    return {
      nextState: this.update(state),
      uiActions: [this],
      persistenceActions: [],
    };
  }
}
