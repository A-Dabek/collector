import { GAME_ACTIONS, ResponseActions } from '../../actions/game-actions';
import { GameState } from '../../logic/engine';
import { PlayableCard } from '../card';

export class PaperBagCrumpledCard implements PlayableCard {
  play(state: GameState): ResponseActions {
    return GAME_ACTIONS.setSpace(state.space - 1)(state);
  }

  enabled(state: GameState): boolean {
    return state.space > state.cards.length;
  }
}
