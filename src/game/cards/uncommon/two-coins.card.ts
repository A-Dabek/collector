import { ResponseActions } from '../../actions/game-actions';
import { GameState } from '../../logic/engine';
import { PlayableCard } from '../card';
import { SetPointsAction } from '../../actions/set-points.action';
import { AddPointsAction } from '../../actions/add-points.action';
import { Card } from '../../library/access';

export class TwoCoinsCard implements PlayableCard {
  play(state: GameState, card: Card): ResponseActions {
    return new AddPointsAction(2).next(state);
  }

  enabled(_: GameState): boolean {
    return true;
  }
}
