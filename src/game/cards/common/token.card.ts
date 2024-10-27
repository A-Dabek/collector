import { ResponseActions } from '../../actions/game-actions';
import { GameState } from '../../logic/engine';
import { PlayableCard } from '../card';
import { AddPointsAction } from '../../actions/add-points.action';
import { Card } from '../../library/access';

export class TokenCard implements PlayableCard {
  play(state: GameState, card: Card): ResponseActions {
    return new AddPointsAction(1).next(state);
  }

  enabled(_: GameState): boolean {
    return true;
  }
}
