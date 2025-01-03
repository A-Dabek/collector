import { Rarity } from '../../ui/rarity';
import { CardDrawFromHistoryActionCreator } from '../actions/card-draw-from-history-action.creator';
import { GameState } from '../logic/engine';
import { CardName } from './access';
import { BasePlayableCard } from './card';

export class RaiseZombieCard extends BasePlayableCard {
  override name: CardName = 'raise-zombie';
  override rarity: Rarity = 'common';
  override actions = [new CardDrawFromHistoryActionCreator(1)];

  override enabled(state: GameState): boolean {
    return state.cardHistory.length > 0;
  }
}
