import { Rarity } from '../../../ui/rarity';
import { CardWasteRandomActionCreator } from '../../actions/creators/card-waste-random-action.creator';
import { GameState } from '../../logic/engine';
import { CardName } from '../access';
import { BasePlayableCard } from '../card';

export class SpikesInitCard extends BasePlayableCard {
  override name: CardName = 'spikes-init';
  override rarity: Rarity = 'common';
  override actions = [new CardWasteRandomActionCreator(this.id, 1)];

  override enabled(state: GameState): boolean {
    return state.cards.length > 1;
  }
}
