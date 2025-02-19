import { getRandomCardName } from '../library/access';
import { GameState } from '../logic/engine';
import { CardAddAction } from './basic/card-add.action';
import { GameAction } from './game-actions';

export class CardDrawAction implements GameAction {
  // private readonly randomCards: PlayableCard[];

  constructor(private readonly count: number) {}

  get description(): string {
    return `Draw (${this.count})`;
  }

  isApplicable(state: GameState): boolean {
    return state.space - state.cards.length >= this.count;
  }

  next(state: GameState) {
    const randomCards = new Array(this.count).fill(0).map(getRandomCardName);
    const cardAdd = new CardAddAction(randomCards);
    return cardAdd.next(state);
  }
}
