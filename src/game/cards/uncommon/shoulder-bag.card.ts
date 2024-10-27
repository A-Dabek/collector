import { ResponseActions } from '../../actions/game-actions';
import { GameState } from '../../logic/engine';
import { PlayableCard } from '../card';
import { SetSpaceAction } from '../../actions/set-space.action';
import { AddSpaceAction } from '../../actions/add-space.action';
import { Card } from '../../library/access';

export class ShoulderBagCard implements PlayableCard {
  play(state: GameState, card: Card): ResponseActions {
    return new AddSpaceAction(2).next(state);
  }

  enabled(_: GameState): boolean {
    return true;
  }
}
