import { GameState } from '../logic/engine';
import { GameAction, ResponseActions } from './game-actions';
import { GameUiState } from './ui-actions';
import { Card } from '../library/access';
import { CardWasteAction } from './card-waste.action';

export class CardWasteRandomAction implements GameAction {
  private cards: Card[] | undefined;

  constructor(private readonly count: number) {}

  update(state: GameUiState): GameUiState {
    if (!this.cards) {
      this.cards = this.findIds(state.cards);
    }
    return new CardWasteAction(this.cards).update(state);
  }

  next(state: GameState): ResponseActions {
    return {
      nextState: this.update(state),
      uiActions: [this],
      persistenceActions: [],
    };
  }

  private findIds(cards: Card[]) {
    function randomShuffleCards() {
      const shuffledCards = cards.slice();
      for (let i = shuffledCards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledCards[i], shuffledCards[j]] = [
          shuffledCards[j],
          shuffledCards[i],
        ];
      }
      return shuffledCards;
    }

    const shuffled = randomShuffleCards();
    let count = this.count;
    if (count > shuffled.length) count = shuffled.length;
    return shuffled.slice(0, count);
  }
}
