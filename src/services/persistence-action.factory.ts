import { ItemId } from './collection-persistence.service';

export interface PointsSetPersistenceAction {
  resource: 'POINTS';
  op: 'SET';
  payload: number;
}

export interface ItemDeletePersistenceAction {
  resource: 'ITEM';
  op: 'DELETE';
  payload: string;
}

export interface ItemSetPersistenceAction {
  resource: 'ITEM';
  op: 'SET';
  payload: ItemId;
}

export type PersistenceAction =
  | ItemSetPersistenceAction
  | ItemDeletePersistenceAction
  | PointsSetPersistenceAction;

export const PersistenceActionFactory = {
  setPoints(payload: number): PointsSetPersistenceAction {
    return {
      resource: 'POINTS',
      op: 'SET',
      payload,
    };
  },

  deleteItem(payload: string): ItemDeletePersistenceAction {
    return {
      resource: 'ITEM',
      op: 'DELETE',
      payload,
    };
  },

  setItem(payload: ItemId): ItemSetPersistenceAction {
    return {
      resource: 'ITEM',
      op: 'SET',
      payload,
    };
  },
};
