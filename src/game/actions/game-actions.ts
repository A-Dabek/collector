import { PersistenceAction } from '../../services/persistence-action.factory';
import { GameState } from '../logic/engine';
import { GameUiState, UiAction } from './ui-actions';

export interface ResponseActions {
  persistenceActions: PersistenceAction[];
  uiActions: UiAction[];
  nextState: GameState;
}

export type InteractiveAction = (state: GameState) => ResponseActions;

export interface GameAction {
  next(state: GameState): ResponseActions;

  update: (state: GameUiState) => GameUiState;
}
