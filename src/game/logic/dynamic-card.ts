import { PersistenceAction } from '../../services/persistence-action.factory';
import { GameAction, ResponseActions } from '../actions/game-actions';
import { UiAction } from '../actions/ui-actions';
import { GameState } from './engine';

export function combineActions(
  state: GameState,
  actions: GameAction[],
): ResponseActions {
  let combinedPersistenceActions: PersistenceAction[] = [];
  let combinedUiActions: UiAction[] = [];
  let nextState = state;
  actions.forEach((action) => {
    const response = action.next(nextState);
    combinedPersistenceActions = combinedPersistenceActions.concat(
      response.persistenceActions,
    );
    combinedUiActions = combinedUiActions.concat(response.uiActions);
    nextState = response.nextState;
  });

  return {
    persistenceActions: combinedPersistenceActions,
    uiActions: combinedUiActions,
    nextState,
  };
}
