import { Rarity } from '../../../ui/rarity';
import { AddSpaceAction } from '../../actions/add-space.action';
import { GameState } from '../../logic/engine';
import { CardName } from '../access';
import { BasePlayableCard } from '../card';

export class PaperBagCrumpledCard extends BasePlayableCard {
  override name: CardName = 'paper-bag-crumpled';
  override rarity: Rarity = 'uncommon';
  override actions = [new AddSpaceAction(-1)];

  override enabled(state: GameState): boolean {
    return state.space > state.cards.length;
  }
}
