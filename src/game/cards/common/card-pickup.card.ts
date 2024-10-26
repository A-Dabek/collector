import { GAME_ACTIONS, ResponseActions } from '../../actions/game-actions';
import { GameState } from '../../logic/engine';
import { PlayableCard } from '../card';

export class CardPickupCard implements PlayableCard {
  play(state: GameState): ResponseActions {
    return GAME_ACTIONS.cardsDraw(2)(state);
  }

  enabled(state: GameState): boolean {
    return state.space - state.cards.length > 1;
  }
}
