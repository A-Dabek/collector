import { ResponseActions } from '../actions/game-actions';
import { GameState } from '../logic/engine';

export interface PlayableCard {
  play(state: GameState): ResponseActions;
  enabled(state: GameState): boolean;
}
