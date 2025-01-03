import { Rarity } from '../../../ui/rarity';
import { GameAction } from '../../actions/game-actions';
import { StartTargetingAction } from '../../actions/start-targeting.action';
import { CardName } from '../../library/library';
import { GameState } from '../../logic/engine';
import { BasePlayableCard } from '../card';

export class HammerBreakCard extends BasePlayableCard {
  override name: CardName = 'hammer-break';
  override rarity: Rarity = 'uncommon';

  // play(state: GameState, card: Card) {
  //   const targets = state.cards.filter((card) => card.targetCandidate);
  //   return new CardWasteAction(targets);
  // }

  target(state: GameState): GameAction[] {
    return [new StartTargetingAction(this)];
  }

  override enabled(state: GameState): boolean {
    return state.cards.length > 1;
  }
}
