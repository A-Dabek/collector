import { inject, Injectable } from '@angular/core';
import {
  collection,
  collectionData,
  doc,
  Firestore,
  orderBy,
  query,
  setDoc,
  where,
  writeBatch,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface Id {
  id: string;
}

export interface Item {
  rarity: number;
  enhancement: string;
}

@Injectable({ providedIn: 'root' })
export class CollectionPersistenceService {
  private readonly firestore = inject(Firestore);
  private readonly collection = collection(this.firestore, 'items');

  readonly items$ = collectionData(
    query(this.collection, orderBy('rarity', 'desc')),
    {
      idField: 'id',
    },
  ) as Observable<(Item & Id)[]>;

  collectionByRarity(rarity: number): Observable<(Item & Id)[]> {
    const rarityQuery = query(this.collection, where('rarity', '==', rarity));
    return collectionData(rarityQuery, { idField: 'id' });
  }

  setItem(id: string, item: Item) {
    setDoc(doc(this.collection, id), item);
  }

  setItems(items: (Item & Id)[]) {
    const batch = writeBatch(this.firestore);
    items.forEach(({ id, ...item }) => {
      const itemDoc = doc(this.collection, id);
      batch.set(itemDoc, item);
    });
    return batch.commit();
  }
}
