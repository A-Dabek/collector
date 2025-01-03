import { Rarity } from '../../../ui/rarity';
import { CardDrawAction } from '../../actions/card-draw.action';
import { CardName } from '../../library/library';
import { GameState } from '../../logic/engine';
import { BasePlayableCard } from '../card';

export class Card2DiamondsCard extends BasePlayableCard {
  override name: CardName = 'card-2-diamonds';
  override rarity: Rarity = 'uncommon';
  override actions = [new CardDrawAction(5)];

  override enabled(state: GameState): boolean {
    return state.space - state.cards.length > 2;
  }
}
