import { Rarity } from '../../ui/rarity';
import { CostHealthAction } from '../actions/cost-health.action';
import { EffectWasteAction } from '../actions/effect-waste.action';
import { GameAction } from '../actions/game-actions';
import { CardName } from '../cards/access';
import { GameState } from '../logic/engine';
import { BaseEffect } from './effect';

export class PlainPadlockEffect extends BaseEffect {
  override name: CardName = 'plain-padlock';
  override rarity: Rarity = 'common';

  override get description(): string {
    return 'Next card costs nothing';
  }

  override apply(state: GameState, actions: GameAction[]): GameAction[] {
    const firstCostHealthAction = actions.findIndex(
      (action) => action instanceof CostHealthAction,
    );
    if (firstCostHealthAction !== -1) {
      actions.splice(firstCostHealthAction, 1);
    }
    return [...actions, new EffectWasteAction([this])];
  }
}
