import { Rarity } from '../../ui/rarity';
import { EffectAddAction } from '../actions/effect-add.action';
import { PlainPadlockEffect } from '../effects/plain-padlock.effect';

import { CardName } from './access';
import { BasePlayableCard } from './card';

export class PlainPadlockCard extends BasePlayableCard {
  override name: CardName = 'plain-padlock';
  override rarity: Rarity = 'common';
  override actions = [new EffectAddAction([new PlainPadlockEffect()])];
}
