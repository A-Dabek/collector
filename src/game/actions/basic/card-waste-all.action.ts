import { GameState } from '../../logic/engine';
import { GameAction } from '../game-actions';

export class CardWasteAllAction implements GameAction {
  get description(): string {
    return 'Waste all';
  }

  next(state: GameState) {
    return {
      ...state,
      cards: [],
    };
  }
}
