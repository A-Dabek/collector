import { GameCard } from '../../cards/card';
import { GameState } from '../../logic/engine';
import { CardWasteAction } from '../basic/card-waste.action';
import { GameAction, GameReactionCreator } from '../game-actions';

export class OnWasteReaction implements GameReactionCreator {
  constructor(private readonly actions: GameAction[]) {}

  check(trigger: GameAction, ownerCard: GameCard): boolean {
    return (
      trigger instanceof CardWasteAction && trigger.ids.includes(ownerCard.id)
    );
  }

  create(state: GameState) {
    return this.actions;
  }

  get description(): string {
    return `[Post Waste] ${this.actions.map((a) => a.description).join(', ')}`;
  }
}
