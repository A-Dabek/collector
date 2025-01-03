import { GameState } from '../logic/engine';
import { GameAction } from './game-actions';
import { SetSpaceAction } from './set-space.action';

export class AddSpaceAction implements GameAction {
  constructor(private readonly increment: number) {}

  get description(): string {
    return `Expand (${this.increment})`;
  }

  next(state: GameState) {
    return new SetSpaceAction(state.space + this.increment).next(state);
  }
}
