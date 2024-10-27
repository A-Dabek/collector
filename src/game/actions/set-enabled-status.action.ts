import { GameState } from '../logic/engine';
import { GameAction, ResponseActions } from './game-actions';
import { GameUiState } from './ui-actions';
import { Card } from '../library/access';

export class SetEnabledStatusAction implements GameAction {
  constructor(private readonly futureCards: Card[]) {}

  update(state: GameUiState): GameUiState {
    return {
      ...state,
      cards: state.cards.map((card) => ({
        ...card,
        enabled:
          this.futureCards.find((futureCard) => futureCard.id === card.id)
            ?.enabled ?? false,
      })),
    };
  }

  next(state: GameState): ResponseActions {
    return {
      nextState: this.update(state),
      uiActions: [this],
      persistenceActions: [],
    };
  }
}
