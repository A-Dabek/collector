import { Rarity } from '../../../ui/rarity';
import { AddSpaceAction } from '../../actions/add-space.action';

import { CardName } from '../access';
import { BasePlayableCard } from '../card';

export class ShoulderBagCard extends BasePlayableCard {
  override name: CardName = 'shoulder-bag';
  override rarity: Rarity = 'uncommon';
  override actions = [new AddSpaceAction(2)];
}
