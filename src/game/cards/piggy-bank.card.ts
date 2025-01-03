import { Rarity } from '../../ui/rarity';
import { CardAddAction } from '../actions/card-add.action';
import { OnWasteReaction } from '../actions/reactions/on-waste-reaction';
import { UnplayableAction } from '../actions/unplayable.action';
import { CardName } from '../library/library';
import { GameState } from '../logic/engine';
import { BasePlayableCard } from './card';

export class PiggyBankCard extends BasePlayableCard {
  override name: CardName = 'piggy-bank';
  override rarity: Rarity = 'uncommon';
  override reactions = [
    new OnWasteReaction([new CardAddAction(new Array(3).fill('token'))]),
  ];

  override enabled(state: GameState): boolean {
    return false;
  }

  override costActions() {
    return [new UnplayableAction()];
  }
}
