import { ResponseActions } from '../../actions/game-actions';
import { GameState } from '../../logic/engine';
import { PlayableCard } from '../card';
import { CardDrawAction } from '../../actions/card-draw.action';
import { Card } from '../../library/access';

export class CardPickupCard implements PlayableCard {
  play(state: GameState, card: Card): ResponseActions {
    return new CardDrawAction(2).next(state);
  }

  enabled(state: GameState): boolean {
    return state.space - state.cards.length > 1;
  }
}
