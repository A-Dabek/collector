import { GameCard } from '../cards/card';
import { GameState } from '../logic/engine';
import { GameAction } from './game-actions';

export class TargetEndAction implements GameAction {
  constructor(readonly targets: GameCard[]) {}

  get description(): string {
    return 'Select a target';
  }

  isApplicable(state: GameState): boolean {
    return true;
  }

  next(state: GameState): GameState {
    return { ...state };
  }
}
