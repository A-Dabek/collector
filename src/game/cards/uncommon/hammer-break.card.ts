import { Rarity } from '../../../ui/rarity';
import { CardWasteAction } from '../../actions/basic/card-waste.action';
import { GameAction } from '../../actions/game-actions';
import { TargetStartAction } from '../../actions/target-start.action';
import { GameState } from '../../logic/engine';
import { CardName } from '../access';
import { BasePlayableCard, GameCard } from '../card';

export class HammerBreakCard extends BasePlayableCard {
  override name: CardName = 'hammer-break';
  override rarity: Rarity = 'uncommon';
  override actions = [new TargetStartAction(this)];

  target(state: GameState, targets: GameCard[]): GameAction[] {
    return [new CardWasteAction(targets)];
  }
}
