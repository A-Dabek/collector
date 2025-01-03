import { GameState } from '../logic/engine';
import { GameAction } from './game-actions';
import { SetHealthAction } from './set-health.action';

export class AddHealthAction implements GameAction {
  constructor(private readonly increment: number) {}

  get description(): string {
    return `Heal (${this.increment})`;
  }

  next(state: GameState) {
    return new SetHealthAction(state.health + this.increment).next(state);
  }
}
