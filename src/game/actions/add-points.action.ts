import { GameState } from '../logic/engine';
import { GameAction } from './game-actions';
import { SetPointsAction } from './basic/set-points.action';

export class AddPointsAction implements GameAction {
  constructor(private readonly increment: number) {}

  get description(): string {
    return `Earn (${this.increment})`;
  }

  isApplicable(state: GameState): boolean {
    return true;
  }

  next(state: GameState) {
    return new SetPointsAction(state.points + this.increment).next(state);
  }
}
