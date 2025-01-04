import { GameState } from '../logic/engine';
import { GameAction } from './game-actions';
import { SetHealthAction } from './basic/set-health.action';

export class AddHealthAction implements GameAction {
  constructor(private readonly increment: number) {}

  get description(): string {
    return `Heal (${this.increment})`;
  }

  isApplicable(state: GameState): boolean {
    return state.health + this.increment >= 0;
  }

  next(state: GameState) {
    return new SetHealthAction(state.health + this.increment).next(state);
  }
}
