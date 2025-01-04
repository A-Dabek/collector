import { GameState } from '../../logic/engine';
import { GameAction } from '../game-actions';

export class SetHealthAction implements GameAction {
  constructor(private readonly value: number) {}

  get description(): string {
    return `Set health to ${this.value}`;
  }

  isApplicable(state: GameState): boolean {
    return true;
  }

  next(state: GameState) {
    const targetHealth = Math.min(this.value, state.maxHealth);
    return {
      ...state,
      health: targetHealth,
    };
  }
}
