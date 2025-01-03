import { Card } from '../cards/card';

export interface GameUiState {
  points: number;
  maxPoints: number;
  health: number;
  maxHealth: number;
  space: number;
  cards: Card[];
}
