import { GAME_ACTIONS, ResponseActions } from '../../actions/game-actions';
import { GameState } from '../../logic/engine';
import { PlayableCard } from '../card';

export class SpikesHalfCard implements PlayableCard {
  play(state: GameState): ResponseActions {
    return GAME_ACTIONS.destroyRandom(state, 2);
  }

  enabled(state: GameState): boolean {
    return state.cards.length > 2;
  }
}
