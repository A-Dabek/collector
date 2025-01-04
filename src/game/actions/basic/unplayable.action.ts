import { GameState } from '../../logic/engine';
import { GameAction } from '../game-actions';

export class UnplayableAction implements GameAction {
  get description(): string {
    return `Unplayable`;
  }

  isApplicable(state: GameState): boolean {
    return false;
  }

  next(state: GameState) {
    return state;
  }
}
