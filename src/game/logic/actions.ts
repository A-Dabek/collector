import { ItemId } from '../../services/collection-persistence.service';
import { CollectionRollService } from '../../services/collection-roll.service';
import {
  PersistenceAction,
  PersistenceActionFactory,
} from '../../services/persistence-action.factory';
import { itemAddUiAction, pointsChangeUiAction, UiAction } from '../ui-actions';

export interface ResponseActions {
  persistenceActions: PersistenceAction[];
  uiActions: UiAction[];
}

export function combineActions(actions: ResponseActions[]): ResponseActions {
  const combinedPersistenceActions = actions.flatMap(
    (action) => action.persistenceActions,
  );
  const combinedUiActions = actions.flatMap((action) => action.uiActions);

  return {
    persistenceActions: combinedPersistenceActions,
    uiActions: combinedUiActions,
  };
}

export function pointsChangeAction(payload: number): ResponseActions {
  return {
    uiActions: [pointsChangeUiAction(payload)],
    persistenceActions: [PersistenceActionFactory.setPoints(payload)],
  };
}

export function itemAddAction(payload: ItemId): ResponseActions {
  return {
    uiActions: [itemAddUiAction(payload)],
    persistenceActions: [PersistenceActionFactory.setItem(payload)],
  };
}

export function cardCostAction(rarity: number): ResponseActions {
  return pointsChangeAction(6 - rarity);
}

export function cardDrawAction(count: number): ResponseActions {
  const roll = new CollectionRollService();
  return itemAddAction(roll.getRandomItem());
}

export function healAction(payload: number): ResponseActions {
  return {
    uiActions: [],
    persistenceActions: [],
  };
}

export function expandAction(count: number): ResponseActions {
  return {
    uiActions: [],
    persistenceActions: [],
  };
}

export function shrinkRandomAction(count: number): ResponseActions {
  return {
    uiActions: [],
    persistenceActions: [],
  };
}

export function shrinkAction(index: number): ResponseActions {
  return {
    uiActions: [],
    persistenceActions: [],
  };
}

export function destroyAction(): ResponseActions {
  return {
    uiActions: [],
    persistenceActions: [],
  };
}

export function destroyRandomAction(count: number): ResponseActions {
  return {
    uiActions: [],
    persistenceActions: [],
  };
}

export function earnPointsAction(points: number): ResponseActions {
  return {
    uiActions: [],
    persistenceActions: [],
  };
}

export function changeMaxHpAction(change: number): ResponseActions {
  return {
    uiActions: [],
    persistenceActions: [],
  };
}

export function healMissingHpAction(percent: number): ResponseActions {
  return {
    uiActions: [],
    persistenceActions: [],
  };
}

export function increaseLuckAction(luck: number): ResponseActions {
  return {
    uiActions: [],
    persistenceActions: [],
  };
}

export function healMaxHpAction(percent: number): ResponseActions {
  return {
    uiActions: [],
    persistenceActions: [],
  };
}
