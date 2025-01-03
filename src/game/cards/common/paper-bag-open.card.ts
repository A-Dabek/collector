import { Rarity } from '../../../ui/rarity';
import { SetSpaceAction } from '../../actions/set-space.action';
import { CardName } from '../../library/library';
import { BasePlayableCard } from '../card';

export class PaperBagOpenCard extends BasePlayableCard {
  override name: CardName = 'paper-bag-open';
  override rarity: Rarity = 'uncommon';
  override actions = [new SetSpaceAction(1)]; // FIXME new SetSpaceAction(state.space + 1)
}
