import { PlayableCard } from '../cards/card';
import { GameState } from '../logic/engine';
import { GameAction } from './game-actions';

export class StartTargetingAction implements GameAction {
  constructor(private readonly source: PlayableCard) {}

  get description(): string {
    return 'Select a target';
  }

  next(state: GameState) {
    return {
      ...state,
      cards: state.cards.map((card) => {
        return {
          ...card,
          targetSource: card.id === this.source.id,
          // targetCandidate: !card.targetDest && card.id !== this.source.id,
        };
      }),
    };
  }
}
