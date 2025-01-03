import { Rarity } from '../../../ui/rarity';
import { CardDrawAction } from '../../actions/card-draw.action';
import { GameState } from '../../logic/engine';
import { CardName } from '../access';
import { BasePlayableCard } from '../card';

export class CardPickupCard extends BasePlayableCard {
  override name: CardName = 'card-pickup';
  override rarity: Rarity = 'common';
  override actions = [new CardDrawAction(3)];

  override enabled(state: GameState): boolean {
    return state.space - state.cards.length > 2;
  }
}
