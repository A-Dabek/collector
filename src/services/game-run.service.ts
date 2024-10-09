import { inject, Injectable } from '@angular/core';
import { GameEngine } from '../game/logic/state';
import { UiAction } from '../game/ui-actions';
import { ItemId } from './collection-persistence.service';
import { CollectionRollService } from './collection-roll.service';
import {
  GameRun,
  GameRunPersistenceService,
} from './game-run-persistence.service';

@Injectable({ providedIn: 'root' })
export class GameRunService {
  private readonly rollService = inject(CollectionRollService);
  private readonly persistenceService = inject(GameRunPersistenceService);
  private readonly engine = new GameEngine();

  async init() {
    const response = this.engine.startNewGame();
    await this.persistenceService.persist(response.persistenceActions);

    return response.uiActions;
  }

  async play(item: ItemId) {
    const response = this.engine.play(item);
    await this.persistenceService.persist(response.persistenceActions);

    return response.uiActions;
  }

  _conciliation(state: GameRun, items: ItemId[]) {
    const differences: string[] = [];
    // Check differences in state
    if (this.engine.state().points !== state.points) {
      differences.push(
        `Points: local = ${this.engine.state().points}, provided = ${state.points}`,
      );
    }

    if (this.engine.state().maxPoints !== state.maxPoints) {
      differences.push(
        `MaxPoints: local = ${this.engine.state().maxPoints}, provided = ${state.maxPoints}`,
      );
    }

    // Check differences in items
    const localItemMap = new Map(
      this.engine.state().items.map((item) => [item.id, item.rarity]),
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
