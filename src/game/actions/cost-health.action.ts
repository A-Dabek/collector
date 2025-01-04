import { rarities, Rarity } from '../../ui/rarity';
import { GameState } from '../logic/engine';
import { AddHealthAction } from './add-health.action';
import { GameAction } from './game-actions';

export class CostHealthAction implements GameAction {
  private readonly addHealthAction: AddHealthAction;
  private readonly amount: number;

  constructor(rarity: Rarity) {
    this.amount = this.rarityToNumber(rarity);
    this.addHealthAction = new AddHealthAction(-this.amount);
  }

  get description(): string {
    return `Drain (${this.amount})`;
  }

  isApplicable(state: GameState): boolean {
    return this.addHealthAction.isApplicable(state);
  }

  next(state: GameState) {
    return this.addHealthAction.next(state);
  }

  private rarityToNumber(rarity: Rarity): number {
    const index = rarities.findIndex((r) => r === rarity);
    return index + 1; // Adding 1 to transform 0-based index to 1-based number
  }
}
