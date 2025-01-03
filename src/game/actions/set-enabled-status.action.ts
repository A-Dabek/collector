import { CardState } from '../cards/card';
import { GameState } from '../logic/engine';
import { GameAction } from './game-actions';
import { GameUiState } from './ui-actions';

export class SetEnabledStatusAction implements GameAction {
  constructor(private readonly futureCards: CardState[]) {}

  get description(): string {
    throw new Error('Method not implemented.');
  }

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

  next(state: GameState) {
    return {
      nextState: this.update(state),
      uiActions: [this],
      persistenceActions: [],
    };
  }
}
