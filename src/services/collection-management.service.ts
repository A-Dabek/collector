import { inject, Injectable } from '@angular/core';
import {
  CollectionPersistenceService,
  Id,
  Item,
} from './collection-persistence.service';
import { CollectionRollService } from './collection-roll.service';
import { tap } from 'rxjs';
import { COLLECTION_CACHE } from './collection-cache';

@Injectable({ providedIn: 'root' })
export class CollectionManagementService {
  private persistence = inject(CollectionPersistenceService);
  private roll = inject(CollectionRollService);

  collectionByRarity(rarity: number) {
    return this.persistence
      .collectionByRarity(rarity)
      .pipe(
        tap((items) =>
          items.forEach((item) =>
            COLLECTION_CACHE.addItem(item.id, item.rarity),
          ),
        ),
      );
  }

  async rollNewItems(count: number) {
    const newItems: (Item & Id)[] = [];
    let attempts = 0;
    try {
      while (newItems.length < count && attempts < count * 10) {
        const newItem = this.roll.getRandomItem();
        const exists = await this.persistence.checkItemExistsByIdAndRarity(
          newItem.name,
          newItem.rarity,
        );
        if (!exists) {
          newItems.push({
            id: newItem.name,
            rarity: newItem.rarity,
          });
        }
        attempts++;
      }
    } catch (error) {
      console.error('Failed to check item existence:', error);
      return newItems;
    }
    return newItems;
  }

  addItems(items: (Item & Id)[]) {
    this.persistence.setItems(items);
  }
}
