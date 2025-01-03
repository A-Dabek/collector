import { GameEffect } from '../effects/effect';
import { GameState } from '../logic/engine';
import { GameAction } from './game-actions';

export class EffectWasteAction implements GameAction {
  readonly ids: number[];

  constructor(cards: GameEffect[]) {
    this.ids = cards.map((card) => card.id);
  }

  get description(): string {
    return `Waste (${this.ids.length})`;
  }

  next(state: GameState) {
    return {
      ...state,
      effects: state.effects.filter((card) => !this.ids.includes(card.id)),
    };
  }
}
