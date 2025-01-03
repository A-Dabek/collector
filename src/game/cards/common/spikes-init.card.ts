import { Rarity } from '../../../ui/rarity';
import { CardWasteRandomActionCreator } from '../../actions/card-waste-random-action.creator';
import { CardName } from '../../library/library';
import { GameState } from '../../logic/engine';
import { BasePlayableCard } from '../card';

export class SpikesInitCard extends BasePlayableCard {
  override name: CardName = 'spikes-init';
  override rarity: Rarity = 'common';
  override actions = [new CardWasteRandomActionCreator(this.id, 1)];

  override enabled(state: GameState): boolean {
    return state.cards.length > 1;
  }
}
