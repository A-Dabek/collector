import { PersistenceAction } from '../../services/persistence-action.factory';
import { InteractiveAction, ResponseActions } from '../actions/game-actions';
import { UiAction } from '../actions/ui-actions';
import { GameState } from './engine';

export function combineActions(
  state: GameState,
  actions: InteractiveAction[],
): ResponseActions {
  let combinedPersistenceActions: PersistenceAction[] = [];
  let combinedUiActions: UiAction[] = [];
  let nextState = state;
  actions.forEach((action) => {
    const response = action(nextState);
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
