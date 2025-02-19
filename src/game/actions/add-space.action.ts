import { GameState } from '../logic/engine';
import { GameAction } from './game-actions';
import { SetSpaceAction } from './basic/set-space.action';

export class AddSpaceAction implements GameAction {
  constructor(private readonly increment: number) {}

  get description(): string {
    return `Expand (${this.increment})`;
  }

  isApplicable(state: GameState): boolean {
    return true;
  }

  next(state: GameState) {
    return new SetSpaceAction(state.space + this.increment).next(state);
  }
}
