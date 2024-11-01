import { ResponseActions } from '../actions/game-actions';
import { combineActions } from '../logic/dynamic-card';
import { GameState } from '../logic/engine';
import { PlayableCard } from './card';
import { SetHealthAction } from '../actions/set-health.action';
import { SetSpaceAction } from '../actions/set-space.action';
import { SetPointsAction } from '../actions/set-points.action';
import { CardWasteAllAction } from '../actions/card-waste-all.action';

export class FinishGameCard implements PlayableCard {
  play(state: GameState): ResponseActions {
    return combineActions(state, [
      new SetPointsAction(0),
      new SetHealthAction(state.maxHealth),
      new CardWasteAllAction(),
      new SetSpaceAction(0),
    ]);
  }

  enabled(_: GameState): boolean {
    return true;
  }
}
