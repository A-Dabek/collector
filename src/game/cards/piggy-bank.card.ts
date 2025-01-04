import { Rarity } from '../../ui/rarity';
import { CardAddAction } from '../actions/basic/card-add.action';
import { OnWasteReaction } from '../actions/reactions/on-waste-reaction';
import { UnplayableAction } from '../actions/basic/unplayable.action';
import { GameState } from '../logic/engine';
import { CardName } from './access';
import { BasePlayableCard } from './card';

export class PiggyBankCard extends BasePlayableCard {
  override name: CardName = 'piggy-bank';
  override rarity: Rarity = 'uncommon';
  override reactions = [
    new OnWasteReaction([new CardAddAction(new Array(3).fill('token'))]),
  ];

  override costActions() {
    return [new UnplayableAction()];
  }
}
