import { GameState } from '../logic/engine';
import { GameAction, ResponseActions } from './game-actions';
import { GameUiState } from './ui-actions';
import { Card } from '../library/access';
import { PlayableCard } from '../cards/card';
import { CostHealthAction } from './cost-health.action';
import { combineActions } from '../logic/dynamic-card';

export class CardPlayAction implements GameAction {
  private readonly costHealth: CostHealthAction;

  constructor(
    private readonly card: Card,
    private readonly playableCard: PlayableCard,
  ) {
    this.costHealth = new CostHealthAction(this.card.rarity);
  }

  update(state: GameUiState): GameUiState {
    state = this.costHealth.update(state);
    return {
      ...state,
      cards: state.cards.filter((card) => card.id != this.card.id),
    };
  }

  next(state: GameState): ResponseActions {
    return combineActions(state, [
      {
        next: (state) => ({
          nextState: this.update(state),
          uiActions: [this],
          persistenceActions: [],
        }),
      } as GameAction,
      {
        next: (state) => this.playableCard.play(state, this.card),
      } as GameAction,
    ]);
  }
}
