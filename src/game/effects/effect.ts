import { Rarity } from '../../ui/rarity';
import { GameAction } from '../actions/game-actions';
import { Describable } from '../cards/card';
import { CardName } from '../library/library';
import { GameState } from '../logic/engine';

export interface EffectState extends Describable {
  id: number;
  name: CardName;
  rarity: Rarity;
}

export interface GameEffect {
  id: number;
  name: CardName;
  rarity: Rarity;

  get description(): string;

  apply(state: GameState, actions: GameAction[]): GameAction[];

  serialize(state: GameState): EffectState;
}

export abstract class BaseEffect implements GameEffect {
  abstract readonly name: CardName;

  abstract readonly rarity: Rarity;
  readonly id = Math.random();

  abstract get description(): string;

  abstract apply(state: GameState, actions: GameAction[]): GameAction[];

  serialize(state: GameState): EffectState {
    return {
      id: this.id,
      name: this.name,
      rarity: this.rarity,
      description: this.description,
    };
  }
}
