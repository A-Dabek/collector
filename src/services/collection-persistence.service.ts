import { inject, Injectable } from '@angular/core';
import {
  collection,
  collectionData,
  doc,
  Firestore,
  getDoc,
  orderBy,
  query,
  where,
  writeBatch,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { COLLECTION_CACHE } from './collection-cache';

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

  collectionByRarity(rarity: number): Observable<(Item & Id)[]> {
    const rarityQuery = query(this.collection, where('rarity', '==', rarity));
    return collectionData(rarityQuery, { idField: 'id' });
  }

  setItems(items: (Item & Id)[]) {
    const batch = writeBatch(this.firestore);
    items.forEach(({ id, ...item }) => {
      const itemDoc = doc(this.collection, id);
      batch.set(itemDoc, item);
    });
    return batch.commit();
  }

  async checkItemExistsByIdAndRarity(
    id: string,
    rarity: number,
  ): Promise<boolean> {
    if (COLLECTION_CACHE.itemExists(id, rarity)) {
      return true;
    }

    const itemDoc = doc(this.collection, id);
    const docSnapshot = await getDoc(itemDoc);
    if (docSnapshot.exists()) {
      const data = docSnapshot.data() as Item;
      const exists = data.rarity >= rarity;
      COLLECTION_CACHE.addItem(id, exists ? data.rarity : rarity);
      return exists;
    }

    COLLECTION_CACHE.addItem(id, rarity);
    return false;
  }
}
