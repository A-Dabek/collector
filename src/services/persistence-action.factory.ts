export interface PointsSetPersistenceAction {
  resource: 'POINTS';
  op: 'SET';
  payload: number;
}

export interface HealthSetPersistenceAction {
  resource: 'HP';
  op: 'SET';
  payload: number;
}

export interface SpaceSetPersistenceAction {
  resource: 'SPACE';
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
  payload: string;
}

export type PersistenceAction =
  | ItemSetPersistenceAction
  | ItemDeletePersistenceAction
  | PointsSetPersistenceAction
  | HealthSetPersistenceAction
  | SpaceSetPersistenceAction;

export const PersistenceActionFactory = {
  setPoints(payload: number): PointsSetPersistenceAction {
    return {
      resource: 'POINTS',
      op: 'SET',
      payload,
    };
  },

  setHealth(payload: number): HealthSetPersistenceAction {
    return {
      resource: 'HP',
      op: 'SET',
      payload,
    };
  },

  setSpace(payload: number): SpaceSetPersistenceAction {
    return {
      resource: 'SPACE',
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

  setItem(payload: string): ItemSetPersistenceAction {
    return {
      resource: 'ITEM',
      op: 'SET',
      payload,
    };
  },
};
