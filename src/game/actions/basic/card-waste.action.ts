import { GameCard } from '../../cards/card';
import { GameState } from '../../logic/engine';
import { GameAction } from '../game-actions';

export class CardWasteAction implements GameAction {
  readonly ids: number[];

  constructor(cards: GameCard[]) {
    this.ids = cards.map((card) => card.id);
  }

  get description(): string {
    return `Waste (${this.ids.length})`;
  }

  isApplicable(state: GameState): boolean {
    return true;
  }

  next(state: GameState) {
    return {
      ...state,
      cards: state.cards.filter((card) => !this.ids.includes(card.id)),
    };
  }
}
