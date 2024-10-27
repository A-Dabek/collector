import { ResponseActions } from '../actions/game-actions';
import { GameState } from '../logic/engine';
import {Card} from "../library/access";

export interface PlayableCard {
  play(state: GameState, card: Card): ResponseActions;
  enabled(state: GameState): boolean;
}
