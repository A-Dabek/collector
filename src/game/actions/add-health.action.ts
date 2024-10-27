import { GameState } from '../logic/engine';
import { GameAction, ResponseActions } from './game-actions';
import { GameUiState } from './ui-actions';
import { SetHealthAction } from './set-health.action';

export class AddHealthAction implements GameAction {
  constructor(private readonly increment: number) {}

  update(state: GameUiState): GameUiState {
    return new SetHealthAction(state.health + this.increment).update(state);
  }

  next(state: GameState): ResponseActions {
    return {
      nextState: this.update(state),
      uiActions: [this],
      persistenceActions: [],
    };
  }
}
