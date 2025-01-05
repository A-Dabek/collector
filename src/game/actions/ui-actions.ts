import { CardState } from '../cards/card';
import { EffectState } from '../effects/effect';
import { GameMode } from '../logic/engine';

export interface GameUiState {
  points: number;
  maxPoints: number;
  health: number;
  maxHealth: number;
  space: number;
  cards: CardState[];
  effects: EffectState[];
  mode: GameMode;
  modeTarget?: {
    count: number;
  };
}
