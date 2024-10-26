import { GAME_ACTIONS, ResponseActions } from '../../actions/game-actions';
import { GameState } from '../../logic/engine';
import { PlayableCard } from '../card';

export class Card2DiamondsCard implements PlayableCard {
  play(state: GameState): ResponseActions {
    return GAME_ACTIONS.cardsDraw(3)(state);
  }

  enabled(state: GameState): boolean {
    return state.space - state.cards.length > 2;
  }
}
