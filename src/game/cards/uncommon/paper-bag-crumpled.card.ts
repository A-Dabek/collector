import { Rarity } from '../../../ui/rarity';
import { AddSpaceAction } from '../../actions/add-space.action';
import { CardName } from '../../library/library';
import { GameState } from '../../logic/engine';
import { BasePlayableCard } from '../card';

export class PaperBagCrumpledCard extends BasePlayableCard {
  override name: CardName = 'paper-bag-crumpled';
  override rarity: Rarity = 'uncommon';
  override actions = [new AddSpaceAction(-1)];

  override enabled(state: GameState): boolean {
    return state.space > state.cards.length;
  }
}
