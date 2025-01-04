import { GameState } from '../../logic/engine';
import { GameAction } from '../game-actions';

export class CardWasteAllAction implements GameAction {
  get description(): string {
    return 'Waste all';
  }

  isApplicable(state: GameState): boolean {
    return true;
  }

  next(state: GameState) {
    return {
      ...state,
      cards: [],
    };
  }
}
