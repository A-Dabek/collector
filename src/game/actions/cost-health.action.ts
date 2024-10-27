import { GameState } from '../logic/engine';
import { GameAction, ResponseActions } from './game-actions';
import { GameUiState } from './ui-actions';
import { rarities, Rarity } from '../../ui/rarity';
import { AddHealthAction } from './add-health.action';

export class CostHealthAction implements GameAction {
  constructor(private readonly rarity: Rarity) {}

  private rarityToNumber(rarity: Rarity): number {
    const index = rarities.findIndex((r) => r === rarity);
    return index + 1; // Adding 1 to transform 0-based index to 1-based number
  }

  update(state: GameUiState): GameUiState {
    return new AddHealthAction(-this.rarityToNumber(this.rarity)).update(state);
  }

  next(state: GameState): ResponseActions {
    return {
      nextState: this.update(state),
      uiActions: [this],
      persistenceActions: [],
    };
  }
}
