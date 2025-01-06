import { Rarity } from '../../ui/rarity';
import { EffectWasteAction } from '../actions/basic/effect-waste.action';
import { CostHealthAction } from '../actions/cost-health.action';
import { GameAction } from '../actions/game-actions';
import { CardName } from '../cards/access';
import { GameCard } from '../cards/card';
import { GameState } from '../logic/engine';
import { BaseEffect } from './effect';

export class PlainPadlockEffect extends BaseEffect {
  override name: CardName = 'plain-padlock';
  override rarity: Rarity = 'common';

  override get description(): string {
    return 'Next card costs nothing';
  }

  override apply(
    state: GameState,
    cardPlayed: GameCard,
    action: GameAction,
  ): GameAction[] {
    if (action instanceof CostHealthAction) {
      action.makeFree();
    }
    return [new EffectWasteAction([this])];
  }
}
