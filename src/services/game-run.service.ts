import { inject, Injectable, signal } from '@angular/core';
import {
  itemAddUiAction,
  pointsChangeUiAction,
  ResponseActions,
} from './actions';
import { ItemId } from './collection-persistence.service';
import { CollectionRollService } from './collection-roll.service';
import { GameRun } from './game-run-persistence.service';

@Injectable({ providedIn: 'root' })
export class GameRunService {
  private readonly rollService = inject(CollectionRollService);

  readonly state = signal<GameRun>({
    points: 100,
    maxPoints: 100,
  });

  readonly items = signal<ItemId[]>([]);

  init(state: GameRun, items: ItemId[]): ResponseActions {
    this.state.set(state);
    this.items.set(items);
    return {
      uiActions: [
        pointsChangeUiAction(100),
        itemAddUiAction({
          id: 'sacrificial-dagger',
          rarity: 0,
        }),
      ],
      persistenceActions: [],
      runtimeActions: [],
    };
  }

  private applyEvent_cost(item: ItemId) {
    this.state.update((state) => ({
      ...state,
      points: state.points - this.rarityToCostPoints(item.rarity),
    }));
  }

  play(item: ItemId): ResponseActions {
    if (item.id === 'sacrificial-dagger') {
      const rolled = this.rollService.getRandomItem();
      const newItem: ItemId = {
        id: rolled.name,
        rarity: rolled.rarity,
      };
      return {
        uiActions: [
          pointsChangeUiAction(-this.rarityToCostPoints(item.rarity)),
          itemAddUiAction(newItem),
        ],
        persistenceActions: [],
        runtimeActions: [],
      };
    }
    return {
      uiActions: [],
      persistenceActions: [],
      runtimeActions: [],
    };
  }

  private applyEvent_draw() {
    const rolled = this.rollService.getRandomItem();
    const newItem: ItemId = {
      id: rolled.name,
      rarity: rolled.rarity,
    };
    this.items.update((items) => [...items, newItem]);
  }

  private rarityToCostPoints(rarity: number) {
    return 6 - rarity;
  }

  _conciliation(state: GameRun, items: ItemId[]) {
    const differences: string[] = [];
    // Check differences in state
    if (this.state().points !== state.points) {
      differences.push(
        `Points: local = ${this.state().points}, provided = ${state.points}`,
      );
    }

    if (this.state().maxPoints !== state.maxPoints) {
      differences.push(
        `MaxPoints: local = ${this.state().maxPoints}, provided = ${state.maxPoints}`,
      );
    }

    // Check differences in items
    const localItemMap = new Map(
      this.items().map((item) => [item.id, item.rarity]),
    );
    const providedItemMap = new Map(
      items.map((item) => [item.id, item.rarity]),
    );

    // Check for missing and additional items and rarity differences
    localItemMap.forEach((rarity, localId) => {
      const providedRarity = providedItemMap.get(localId);
      if (providedRarity === undefined) {
        differences.push(`Item missing in provided items: ${localId}`);
      } else if (providedRarity !== rarity) {
        differences.push(
          `Item rarity mismatch for ${localId}: local = ${rarity}, provided = ${providedRarity}`,
        );
      }
    });

    providedItemMap.forEach((rarity, providedId) => {
      if (!localItemMap.has(providedId)) {
        differences.push(`Additional item in provided items: ${providedId}`);
      }
    });

    // Log differences
    if (differences.length > 0) {
      console.log('Differences found:', differences.join(', '));
    } else {
      console.log('No differences found');
    }
  }
}
