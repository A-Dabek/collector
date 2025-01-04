import { Rarity } from '../../ui/rarity';
import { CardDrawFromHistoryActionCreator } from '../actions/creators/card-draw-from-history-action.creator';
import { CardName } from './access';
import { BasePlayableCard } from './card';

export class RaiseZombieCard extends BasePlayableCard {
  override name: CardName = 'raise-zombie';
  override rarity: Rarity = 'uncommon';
  override actions = [new CardDrawFromHistoryActionCreator(1)];
}
