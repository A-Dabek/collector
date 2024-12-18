import { ResponseActions } from '../../actions/game-actions';
import { GameState } from '../../logic/engine';
import { PlayableCard } from '../card';
import { StartTargetingAction } from '../../actions/start-targeting.action';
import { Card } from '../../library/access';

export class HammerBreakCard implements PlayableCard {
  play(state: GameState, card: Card): ResponseActions {
    return new StartTargetingAction(card).next(state);
  }

  enabled(state: GameState): boolean {
    return state.cards.length > 1;
  }
}
