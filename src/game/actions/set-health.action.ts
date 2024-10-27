import { GameState } from '../logic/engine';
import { GameAction, ResponseActions } from './game-actions';
import { GameUiState } from './ui-actions';

export class SetHealthAction implements GameAction {
  constructor(private readonly value: number) {}

  update(state: GameUiState): GameUiState {
    const targetHealth = Math.min(this.value, state.maxHealth);
    return {
      ...state,
      health: targetHealth,
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
