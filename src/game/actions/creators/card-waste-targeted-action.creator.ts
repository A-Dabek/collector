import { GameState } from '../../logic/engine';
import { CardWasteAction } from '../basic/card-waste.action';
import { GameAction, GameActionCreator } from '../game-actions';

export class CardWasteTargetedActionCreator implements GameActionCreator {
  isApplicable(state: GameState): boolean {
    return true;
  }

  create(state: GameState): GameAction[] {
    const targets = state.modeTarget?.selectedIds ?? [];
    const targetCards = state.cards.filter((card) => targets.includes(card.id));
    return [new CardWasteAction(targetCards)];
  }

  get description(): string {
    return `Waste targeted`;
  }
}
