import { GameState } from '../logic/engine';
import { GameAction, ResponseActions } from './game-actions';
import { GameUiState } from './ui-actions';
import { SetPointsAction } from './set-points.action';

export class AddPointsAction implements GameAction {
  constructor(private readonly increment: number) {}

  update(state: GameUiState): GameUiState {
    return new SetPointsAction(state.points + this.increment).update(state);
  }

  next(state: GameState): ResponseActions {
    return {
      nextState: this.update(state),
      uiActions: [this],
      persistenceActions: [],
    };
  }
}
