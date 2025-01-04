import { Rarity } from '../../ui/rarity';
import { EffectAddAction } from '../actions/basic/effect-add.action';
import { OuroborosEffect } from '../effects/ouroboros.effect';

import { CardName } from './access';
import { BasePlayableCard } from './card';

export class OuroborosCard extends BasePlayableCard {
  override name: CardName = 'ouroboros';
  override rarity: Rarity = 'mythic';
  override actions = [new EffectAddAction([new OuroborosEffect()])];
}
