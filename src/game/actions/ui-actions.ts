import { GameState } from '../logic/engine';

export interface GameUiState extends GameState {}

export interface UiAction {
  update: (state: GameUiState) => GameUiState;
}
