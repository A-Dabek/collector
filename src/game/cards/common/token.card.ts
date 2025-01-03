import { Rarity } from '../../../ui/rarity';
import { AddPointsAction } from '../../actions/add-points.action';
import { CardName } from '../../library/library';
import { BasePlayableCard } from '../card';

export class TokenCard extends BasePlayableCard {
  override name: CardName = 'token';
  override rarity: Rarity = 'common';
  override actions = [new AddPointsAction(1)];
}
