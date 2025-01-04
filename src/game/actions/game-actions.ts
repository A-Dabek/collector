import { GameCard } from '../cards/card';
import { GameState } from '../logic/engine';

export interface GameAction {
  next(state: GameState): GameState;

  isApplicable(state: GameState): boolean;

  get description(): string;
}

export interface GameActionCreator {
  create(state: GameState): GameAction[];

  isApplicable(state: GameState): boolean;

  get description(): string;
}

export interface GameReactionCreator {
  check(trigger: GameAction, ownerCard: GameCard): boolean;

  create(state: GameState): GameAction[];

  get description(): string;
}
