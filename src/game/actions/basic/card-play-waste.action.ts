import { GameCard } from '../../cards/card';
import { GameState } from '../../logic/engine';
import { GameAction } from '../game-actions';

export class CardPlayWasteAction implements GameAction {
  constructor(readonly card: GameCard) {}

  get description(): string {
    return `Once`;
  }

  next(state: GameState): GameState {
    return {
      ...state,
      cards: state.cards.filter((card) => card.id !== this.card.id),
      cardHistory: [...state.cardHistory, this.card.name],
    };
  }
}
