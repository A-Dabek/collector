import { GameState } from '../logic/engine';
import { GameAction } from './game-actions';

export class SetStateAction implements GameAction {
  constructor(private readonly state: GameState) {}

  get description(): string {
    return 'Set state';
  }

  update(): GameState {
    return {
      ...this.state,
    };
  }

  next(state: GameState) {
    return {
      nextState: this.update(),
      uiActions: [this],
      persistenceActions: [],
    };
  }
}
