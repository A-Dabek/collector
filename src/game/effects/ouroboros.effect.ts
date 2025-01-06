import { Rarity } from '../../ui/rarity';
import { CardAutoplayAction } from '../actions/basic/card-autoplay.action';
import { EffectWasteAction } from '../actions/basic/effect-waste.action';
import { GameAction } from '../actions/game-actions';
import { CardName } from '../cards/access';
import { GameCard } from '../cards/card';
import { GameState } from '../logic/engine';
import { BaseEffect } from './effect';

export class OuroborosEffect extends BaseEffect {
  override name: CardName = 'ouroboros';
  override rarity: Rarity = 'mythic';

  override get description(): string {
    return 'Next card is played infinitely many times';
  }

  override apply(
    state: GameState,
    cardPlayed: GameCard,
    action: GameAction,
  ): GameAction[] {
    return [
      new CardAutoplayAction(Array(10).fill(cardPlayed.name)),
      new EffectWasteAction([this]),
    ];
  }
}
