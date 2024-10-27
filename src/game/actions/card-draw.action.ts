import { GameState } from '../logic/engine';
import { GameAction, ResponseActions } from './game-actions';
import { GameUiState } from './ui-actions';
import { Card, getRandomCard } from '../library/access';
import { CardAddAction } from './card-add.action';

export class CardDrawAction implements GameAction {
  private readonly randomCards: Card[];

  constructor(count: number) {
    this.randomCards = new Array(count).fill(0).map(getRandomCard);
  }

  update(state: GameUiState): GameUiState {
    const cardAdd = new CardAddAction(this.randomCards);
    return cardAdd.update(state);
  }

  next(state: GameState): ResponseActions {
    return {
      nextState: this.update(state),
      uiActions: [this],
      persistenceActions: [],
    };
  }
}
