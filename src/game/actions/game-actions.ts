import { PlayableCard } from '../cards/card';
import { GameState } from '../logic/engine';

export interface GameAction {
  next(state: GameState): GameState;

  get description(): string;
}

export interface GameActionCreator {
  create(state: GameState): GameAction;

  get description(): string;
}

export interface GameReactionCreator {
  check(trigger: GameAction, ownerCard: PlayableCard): boolean;

  create(state: GameState): GameAction[];

  get description(): string;
}
