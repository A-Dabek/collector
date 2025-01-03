import { GameState } from '../logic/engine';
import { GameAction } from './game-actions';

export class SetPointsAction implements GameAction {
  constructor(private readonly value: number) {}

  get description(): string {
    return `Set points to ${this.value}`;
  }

  next(state: GameState) {
    const target = Math.min(this.value, state.maxPoints);
    return {
      ...state,
      points: target,
    };
  }
}
