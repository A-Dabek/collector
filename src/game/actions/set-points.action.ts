import { GameState } from '../logic/engine';
import { GameAction, ResponseActions } from './game-actions';
import { GameUiState } from './ui-actions';

export class SetPointsAction implements GameAction {
  constructor(private readonly value: number) {}

  update(state: GameUiState): GameUiState {
    const target = Math.min(this.value, state.maxPoints);
    return {
      ...state,
      points: target,
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
