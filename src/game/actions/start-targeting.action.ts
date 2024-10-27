import { GameState } from '../logic/engine';
import { GameAction, ResponseActions } from './game-actions';
import { GameUiState } from './ui-actions';
import { Card } from '../library/access';

export class StartTargetingAction implements GameAction {
  constructor(private readonly source: Card) {}

  update(state: GameUiState): GameUiState {
    return {
      ...state,
      cards: state.cards.map((card) => {
        return {
          ...card,
          targeting: card.id === this.source.id,
          targetable: card.id !== this.source.id,
        };
      }),
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
