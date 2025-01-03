import { Rarity } from '../../../ui/rarity';
import { AddPointsAction } from '../../actions/add-points.action';

import { CardName } from '../access';
import { BasePlayableCard } from '../card';

export class TwoCoinsCard extends BasePlayableCard {
  override name: CardName = 'two-coins';
  override rarity: Rarity = 'uncommon';

  override actions = [new AddPointsAction(2)];
}
