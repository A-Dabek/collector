import { GameCard } from '../cards/card';
import { GameState } from '../logic/engine';
import { GameAction } from './game-actions';

export class TargetStartAction implements GameAction {
  constructor(private readonly source: GameCard) {}

  get description(): string {
    return 'Select a target';
  }

  isApplicable(state: GameState): boolean {
    return state.cards.length > 1;
  }

  next(state: GameState): GameState {
    return {
      ...state,
      mode: 'target',
      modeTarget: {
        source: this.source,
        candidateIds: state.cards
          .filter((card) => card.id !== this.source.id)
          .map((card) => card.id),
        selectedIds: [],
        count: 1,
        actionsQueue: [],
      },
    };
  }
}
