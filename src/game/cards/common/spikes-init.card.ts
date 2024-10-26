import { GAME_ACTIONS, ResponseActions } from '../../actions/game-actions';
import { GameState } from '../../logic/engine';
import { PlayableCard } from '../card';

export class SpikesInitCard implements PlayableCard {
  play(state: GameState): ResponseActions {
    return GAME_ACTIONS.destroyRandom(state, 1);
  }

  enabled(state: GameState): boolean {
    return state.cards.length > 1;
  }
}
