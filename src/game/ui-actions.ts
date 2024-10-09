import { ItemId } from '../services/collection-persistence.service';
import { GameState } from './logic/state';

export interface GameUiState extends GameState {}

export interface UiAction {
  update: (state: GameState) => GameState;
  type?: string;
}

export function pointsChangeUiAction(payload: number): UiAction {
  return {
    type: 'pointsChange',
    update: (state) => ({
      ...state,
      points: state.points + payload,
    }),
  };
}

export function itemAddUiAction(payload: ItemId): UiAction {
  return {
    type: 'itemAdd',
    update: (state) => ({
      ...state,
      items: [...state.items, payload],
    }),
  };
}
