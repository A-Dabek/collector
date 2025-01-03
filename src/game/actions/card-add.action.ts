import { CardName } from '../cards/access';
import { findCardInLibrary } from '../library/access';
import { GameState } from '../logic/engine';
import { GameAction } from './game-actions';

export class CardAddAction implements GameAction {
  constructor(private readonly cards: CardName[]) {}

  get description(): string {
    return `Draw (${this.cards.join(', ')})`;
  }

  next(state: GameState) {
    return {
      ...state,
      cards: [
        ...state.cards,
        ...this.cards.map((name) => findCardInLibrary(name)),
      ],
    };
  }
}
