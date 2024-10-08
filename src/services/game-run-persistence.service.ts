import { inject, Injectable } from '@angular/core';
import {
  collection,
  collectionData,
  doc,
  docData,
  Firestore,
  setDoc,
  updateDoc,
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
    // reset run
    const newRun: GameRun = {
      points: 100,
      maxPoints: 100,
    };
    await setDoc(this.gameDoc, newRun);

    // reset items
    const itemsSnapshot = await collectionData(this.gameItemsCollection);
    const batch = writeBatch(this.firestore);
    itemsSnapshot.forEach((item: any) => {
      const itemDoc = doc(this.gameItemsCollection, item.id);
      batch.delete(itemDoc);
    });
    await batch.commit();

    // add first item
    const item: Item = {
      rarity: 0,
    };
    await setDoc(doc(this.gameItemsCollection, 'sacrificial-dagger'), item);
  }

  async updatePoints(points: number) {
    const gameRun: Partial<GameRun> = { points };
    await updateDoc(this.gameDoc, gameRun);
  }
}
