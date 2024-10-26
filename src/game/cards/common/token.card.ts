import { GAME_ACTIONS, ResponseActions } from '../../actions/game-actions';
import { GameState } from '../../logic/engine';
import { PlayableCard } from '../card';

export class TokenCard implements PlayableCard {
  play(state: GameState): ResponseActions {
    return GAME_ACTIONS.setPoints(state.points + 1)(state);
  }

  enabled(_: GameState): boolean {
    return true;
  }
}
