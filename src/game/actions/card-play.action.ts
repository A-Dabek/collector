import { PlayableCard } from '../cards/card';
import { GameState } from '../logic/engine';
import { GameAction } from './game-actions';

export class CardPlayAction implements GameAction {
  constructor(readonly card: PlayableCard) {}

  get description(): string {
    return `Once`;
  }

  next(state: GameState) {
    return {
      ...state,
      cards: state.cards.filter((card) => card.id !== this.card.id),
    };
  }
}
