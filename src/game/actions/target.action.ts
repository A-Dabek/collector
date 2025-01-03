import { GameState } from '../logic/engine';
import { GameAction, ResponseActions } from './game-actions';
import { GameUiState } from './ui-actions';
import { Card } from '../library/access';

export class TargetAction implements GameAction {
  constructor(private readonly target: Card) {}

  update(state: GameUiState): GameUiState {
    return {
      ...state,
      cards: state.cards.map((card) => {
        return {
          ...card,
          targetDest: card.id === this.target.id,
        };
      }),
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
