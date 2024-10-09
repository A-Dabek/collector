import { ItemId } from '../../services/collection-persistence.service';
import {
  cardCostAction,
  cardDrawAction,
  combineActions,
  ResponseActions,
} from './actions';

export function cardFactory(item: ItemId): ResponseActions {
  switch (item.id) {
    case 'sacrificial-dagger':
      return combineActions([cardCostAction(item.rarity), cardDrawAction()]);
    default:
      throw new Error(`no such card ${item.id}`);
  }
}
