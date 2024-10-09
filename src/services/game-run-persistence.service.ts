import { inject, Injectable } from '@angular/core';
import {
  collection,
  collectionData,
  doc,
  docData,
  Firestore,
  updateDoc,
  writeBatch,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Id, Item } from './collection-persistence.service';
import {
  ItemDeletePersistenceAction,
  ItemSetPersistenceAction,
  PersistenceAction,
  PointsSetPersistenceAction,
} from './persistence-action.factory';

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

  async persist(actions: PersistenceAction[]) {
    actions.reverse();
    const pointsUpdateActions = actions.find(
      (action): action is PointsSetPersistenceAction =>
        action.resource === 'POINTS',
    );
    if (pointsUpdateActions) {
      await this.updatePoints(pointsUpdateActions.payload);
    }

    // Create a map to track the first action for each item id
    const firstItemActions = new Map<
      string,
      ItemSetPersistenceAction | ItemDeletePersistenceAction
    >();

    for (const action of actions) {
      if (action.resource === 'ITEM') {
        const itemId = action.op === 'SET' ? action.payload.id : action.payload;

        if (!firstItemActions.has(itemId)) {
          firstItemActions.set(itemId, action);
        }
      }
    }

    const batch = writeBatch(this.firestore);
    for (const [itemId, action] of firstItemActions) {
      console.log('[PERSIST] item', action.op, action.payload);
      if (action.op === 'SET') {
        batch.set(doc(this.gameItemsCollection, itemId), action.payload);
      } else if (action.op === 'DELETE') {
        batch.delete(doc(this.gameItemsCollection, itemId));
      }
    }
    await batch.commit();
  }

  private async updatePoints(points: number) {
    console.log('[PERSIST] points', points);
    const gameRun: Partial<GameRun> = { points };
    await updateDoc(this.gameDoc, gameRun);
  }
}
