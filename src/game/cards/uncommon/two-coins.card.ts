import { GAME_ACTIONS, ResponseActions } from '../../actions/game-actions';
import { GameState } from '../../logic/engine';
import { PlayableCard } from '../card';

export class TwoCoinsCard implements PlayableCard {
  play(state: GameState): ResponseActions {
    return GAME_ACTIONS.setPoints(state.points + 2)(state);
  }

  enabled(_: GameState): boolean {
    return true;
  }
}
