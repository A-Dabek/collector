import { signal } from '@angular/core';
import { ItemId } from '../../services/collection-persistence.service';
import {
  combineActions,
  itemAddAction,
  pointsChangeAction,
  ResponseActions,
} from './actions';
import { cardFactory } from './card-factory';

export interface GameState {
  points: number;
  maxPoints: number;
  items: ItemId[];
}

export class GameEngine {
  readonly state = signal<GameState>({
    points: 0,
    maxPoints: 100,
    items: [],
  });

  startNewGame(): ResponseActions {
    const points = 100;
    const firstItem = {
      id: 'sacrificial-dagger',
      rarity: 0,
    };
    this.state.set({
      points,
      maxPoints: points,
      items: [firstItem],
    });

    return combineActions([
      pointsChangeAction(points),
      itemAddAction(firstItem),
    ]);
  }

  play(item: ItemId): ResponseActions {
    return cardFactory(item);
  }
}
