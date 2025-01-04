import { GameEffect } from '../../effects/effect';
import { GameState } from '../../logic/engine';
import { GameAction } from '../game-actions';

export class EffectAddAction implements GameAction {
  constructor(private readonly effects: GameEffect[]) {}

  get description(): string {
    return `Apply (${this.effects.map((e) => e.name).join(', ')})`;
  }

  isApplicable(state: GameState): boolean {
    return true;
  }

  next(state: GameState) {
    return {
      ...state,
      effects: [...state.effects, ...this.effects],
    };
  }
}
