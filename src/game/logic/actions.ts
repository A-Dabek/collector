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

export interface GameAction {
  effect: ResponseActions;
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

export function cardDrawAction(): ResponseActions {
  const roll = new CollectionRollService();
  return itemAddAction(roll.getRandomItem());
}
