import { ResponseActions } from '../../actions/game-actions';
import { GameState } from '../../logic/engine';
import { PlayableCard } from '../card';
import { CardWasteRandomAction } from '../../actions/card-waste-random.action';
import { Card } from '../../library/access';

export class SpikesInitCard implements PlayableCard {
  play(state: GameState, card: Card): ResponseActions {
    return new CardWasteRandomAction(1).next(state);
  }

  enabled(state: GameState): boolean {
    return state.cards.length > 1;
  }
}
