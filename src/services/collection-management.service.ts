import { inject, Injectable } from '@angular/core';
import {
  CollectionPersistenceService,
  Id,
  Item,
} from './collection-persistence.service';
import { CollectionRollService } from './collection-roll.service';
import { tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CollectionManagementService {
  private persistence = inject(CollectionPersistenceService);
  private roll = inject(CollectionRollService);

  private localCopy: Record<string, Item> = {};
  readonly collection$ = this.persistence.items$.pipe(
    tap((items) => {
      this.localCopy = items.reduce(
        (acc, item) => {
          acc[item.id] = item;
          return acc;
        },
        {} as Record<string, Item>,
      );
    }),
  );

  rollNewItems(count: number) {
    const newItems: (Item & Id)[] = [];
    let attempts = 0;
    while (newItems.length < count && attempts < count * 10) {
      const newItem = this.roll.getRandomItem();
      const existingItem = this.localCopy[newItem.name];
      if (!existingItem || newItem.rarity > existingItem.rarity) {
        newItems.push({
          id: newItem.name,
          rarity: newItem.rarity,
          enhancement: '',
        });
      }
      attempts++;
    }
    return newItems;
  }

  addItems(items: (Item & Id)[]) {
    this.persistence.setItems(items);
  }
}
