import { inject, Injectable } from '@angular/core';
import {
  collection,
  collectionData,
  doc,
  docData,
  Firestore,
  setDoc,
  writeBatch,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Id, Item } from './collection-persistence.service';

export interface GameRun {
  points: number;
  maxPoints: number;
}

@Injectable({ providedIn: 'root' })
export class GameRunPersistenceService {
  private readonly firestore = inject(Firestore);
  private readonly collection = collection(this.firestore, 'game');
  private readonly gameDoc = doc(this.collection, '0');
  private readonly gameItemsCollection = collection(this.gameDoc, 'items');

  readonly gameState$ = docData(this.gameDoc) as Observable<GameRun>;
  readonly gameItems$ = collectionData(this.gameItemsCollection, {
    idField: 'id',
  }) as Observable<(Item & Id)[]>;

  async startNewRun(): Promise<void> {
    const newRun: GameRun = {
      points: 0,
      maxPoints: 100,
    };
    await setDoc(this.gameDoc, newRun);

    const itemsSnapshot = await collectionData(this.gameItemsCollection);
    const batch = writeBatch(this.firestore);
    itemsSnapshot.forEach((item: any) => {
      const itemDoc = doc(this.gameItemsCollection, item.id);
      batch.delete(itemDoc);
    });
    await batch.commit();
    const item: Item = {
      rarity: 0,
      enhancement: '',
    };
    await setDoc(doc(this.gameItemsCollection, 'sacrificial-dagger'), item);
  }
}
