import { ItemId } from './collection-persistence.service';

export interface PersistenceAction<T> {
  type: string;
  payload: T;
}

export function pointsChangePAction(
  payload: number,
): PersistenceAction<number> {
  return {
    type: 'pointsChange',
    payload,
  };
}

export function itemAddPAction(payload: ItemId): PersistenceAction<ItemId> {
  return {
    type: 'itemAdd',
    payload,
  };
}

//=============================

export interface UiAction<T> {
  type: string;
  duration: number;
  payload: T;
}

export function pointsChangeUiAction(payload: number): UiAction<number> {
  return {
    type: 'pointsChange',
    duration: 1000,
    payload,
  };
}

export function itemAddUiAction(payload: ItemId): UiAction<ItemId> {
  return {
    type: 'itemAdd',
    duration: 1000,
    payload,
  };
}

//===================================

export interface ResponseActions {
  runtimeActions: GameRuntimeAction<unknown>[];
  persistenceActions: PersistenceAction<unknown>[];
  uiActions: UiAction<unknown>[];
}

export interface GameRuntimeAction<T> {
  play(payload: T): ResponseActions;
}

export const PointsChangeAction: GameRuntimeAction<number> = {
  play(payload: number): ResponseActions {
    return {
      runtimeActions: [],
      persistenceActions: [pointsChangePAction(payload)],
      uiActions: [pointsChangeUiAction(payload)],
    };
  },
};

export const ItemAddAction: GameRuntimeAction<ItemId> = {
  play(payload: ItemId): ResponseActions {
    return {
      runtimeActions: [],
      persistenceActions: [itemAddPAction(payload)],
      uiActions: [itemAddUiAction(payload)],
    };
  },
};
