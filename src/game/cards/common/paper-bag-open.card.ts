import { ResponseActions } from '../../actions/game-actions';
import { GameState } from '../../logic/engine';
import { PlayableCard } from '../card';
import { SetSpaceAction } from '../../actions/set-space.action';
import { Card } from '../../library/access';

export class PaperBagOpenCard implements PlayableCard {
  play(state: GameState, card: Card): ResponseActions {
    return new SetSpaceAction(state.space + 1).next(state);
  }

  enabled(_: GameState): boolean {
    return true;
  }
}
