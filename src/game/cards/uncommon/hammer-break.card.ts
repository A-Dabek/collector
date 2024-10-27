import { GAME_ACTIONS, ResponseActions } from '../../actions/game-actions';
import { GameState } from '../../logic/engine';
import { PlayableCard } from '../card';

export class HammerBreakCard implements PlayableCard {
  play(state: GameState): ResponseActions {
    // return target action, set targets,
    // state -> state.targetable = [...ids]
    // state -> state.targetting = id (this card)
    // when target should be a new method, card.target
    return GAME_ACTIONS.destroyRandom(state, 2);
  }

  enabled(state: GameState): boolean {
    return state.cards.length > 1;
  }
}
