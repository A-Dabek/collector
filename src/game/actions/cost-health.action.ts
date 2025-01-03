import { rarities, Rarity } from '../../ui/rarity';
import { GameState } from '../logic/engine';
import { AddHealthAction } from './add-health.action';
import { GameAction } from './game-actions';

export class CostHealthAction implements GameAction {
  constructor(private readonly rarity: Rarity) {}

  get description(): string {
    return `Drain (${this.rarityToNumber(this.rarity)})`;
  }

  private rarityToNumber(rarity: Rarity): number {
    const index = rarities.findIndex((r) => r === rarity);
    return index + 1; // Adding 1 to transform 0-based index to 1-based number
  }

  next(state: GameState) {
    return new AddHealthAction(-this.rarityToNumber(this.rarity)).next(state);
  }
}
