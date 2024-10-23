import { GAME_ACTIONS, ResponseActions } from '../actions/game-actions';
import { combineActions } from '../logic/dynamic-card';
import { GameState } from '../logic/engine';
import { PlayableCard } from './card';

export class FinishGameCard implements PlayableCard {
  play(state: GameState): ResponseActions {
    return combineActions(state, [
      GAME_ACTIONS.setPoints(0),
      GAME_ACTIONS.setHealth(state.maxHealth),
      GAME_ACTIONS.allCardWaste,
      GAME_ACTIONS.setSpace(0),
    ]);
  }

  enabled(_: GameState): boolean {
    return true;
  }
}
