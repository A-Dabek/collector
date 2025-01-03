import { Rarity } from '../../../ui/rarity';
import { CardWasteRandomActionCreator } from '../../actions/card-waste-random-action.creator';
import { CardName } from '../../library/library';
import { GameState } from '../../logic/engine';
import { BasePlayableCard } from '../card';

export class SpikesHalfCard extends BasePlayableCard {
  override name: CardName = 'spikes-half';
  override rarity: Rarity = 'uncommon';
  override actions = [new CardWasteRandomActionCreator(this.id, 2)];

  override enabled(state: GameState): boolean {
    return state.cards.length > 2;
  }
}
