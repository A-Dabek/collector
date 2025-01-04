import { CardName } from '../../cards/access';
import { findCardInLibrary } from '../../library/access';
import { GameState } from '../../logic/engine';
import { GameAction } from '../game-actions';

export class CardAutoplayAction implements GameAction {
  constructor(private readonly cards: CardName[]) {}

  get description(): string {
    return `Autoplay (${this.cards.join(', ')})`;
  }

  isApplicable(state: GameState): boolean {
    return true;
  }

  next(state: GameState) {
    return {
      ...state,
      autoPlayQueue: [...state.autoPlayQueue, ...this.cards],
    };
  }
}
