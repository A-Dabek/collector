import { GameState } from '../../logic/engine';
import { GameAction } from '../game-actions';

export class UnplayableAction implements GameAction {
  get description(): string {
    return `Unplayable`;
  }

  next(state: GameState) {
    return state;
  }
}
