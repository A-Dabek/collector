import { GameState } from '../../logic/engine';
import { GameAction } from '../game-actions';

export class SetSpaceAction implements GameAction {
  constructor(private readonly value: number) {}

  get description(): string {
    return `Set space to ${this.value}`;
  }

  next(state: GameState) {
    return {
      ...state,
      space: this.value,
    };
  }
}
