import { PlayableCard } from '../cards/card';
import { GameState } from '../logic/engine';
import { CardWasteAction } from './card-waste.action';
import { GameAction, GameActionCreator } from './game-actions';

export class CardWasteRandomActionCreator implements GameActionCreator {
  constructor(
    private readonly ownerId: number,
    private readonly count: number,
  ) {}

  create(state: GameState): GameAction {
    const cardsOtherThanOwner = state.cards.filter(
      (card) => card.id !== this.ownerId,
    );
    return new CardWasteAction(this.findIds(cardsOtherThanOwner));
  }

  get description(): string {
    return `Waste random (${this.count})`;
  }

  private findIds(cards: PlayableCard[]) {
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
