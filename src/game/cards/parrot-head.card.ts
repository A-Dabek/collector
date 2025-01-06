import { Rarity } from '../../ui/rarity';
import { CardPlayWasteAction } from '../actions/basic/card-play-waste.action';
import { GameAction } from '../actions/game-actions';
import { findCardInLibrary } from '../library/access';
import { GameState } from '../logic/engine';
import { CardName } from './access';
import { BasePlayableCard, GameCard } from './card';

export class ParrotHeadCard extends BasePlayableCard {
  override name: CardName = 'parrot-head';
  override rarity: Rarity = 'rare';

  override enabled(state: GameState): boolean {
    if (state.cardHistory.length === 0) {
      return false;
    }
    return this.getLastPlayedCard(state).enabled(state);
  }

  override play(state: GameState): GameAction[] {
    return [
      new CardPlayWasteAction(this),
      ...this.getLastPlayedCard(state).play(state),
    ];
  }

  // FIXME cannot handle .target cards

  private getLastPlayedCard(state: GameState): GameCard {
    const lastCardInHistory = state.cardHistory[state.cardHistory.length - 1];
    return findCardInLibrary(lastCardInHistory);
  }
}
