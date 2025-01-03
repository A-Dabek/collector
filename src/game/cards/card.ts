import { Rarity } from '../../ui/rarity';
import { CardPlayAction } from '../actions/card-play.action';
import { CostHealthAction } from '../actions/cost-health.action';
import {
  GameAction,
  GameActionCreator,
  GameReactionCreator,
} from '../actions/game-actions';
import { CardName } from '../library/library';
import { GameState } from '../logic/engine';

export interface Card {
  id: number;
  name: CardName;
  rarity: Rarity;
  description: string;
  enabled: boolean;
  targetSource: boolean;
  targetCandidate: boolean;
  targetDest: boolean;
}

export interface PlayableCard {
  id: number;
  name: CardName;
  rarity: Rarity;

  get description(): string;

  play(state: GameState): GameAction[];

  target?(state: GameState): GameAction[];

  onAction?(state: GameState, action: GameAction): GameAction[];

  enabled(state: GameState): boolean;

  serialize(state: GameState): Card;
}

export abstract class BasePlayableCard implements PlayableCard {
  protected actions: (GameAction | GameActionCreator)[] = [];
  protected reactions: GameReactionCreator[] = [];

  abstract readonly name: CardName;
  abstract readonly rarity: Rarity;
  readonly id = Math.random();

  get description(): string {
    return [...this.costActions(), ...this.actions, ...this.reactions]
      .map((action) => action.description)
      .join(', ');
  }

  protected costActions(): GameAction[] {
    return [new CostHealthAction(this.rarity), new CardPlayAction(this)];
  }

  play(state: GameState): GameAction[] {
    return [...this.costActions(), ...this.actions].map((action) =>
      'create' in action ? action.create(state) : action,
    );
  }

  onAction(state: GameState, action: GameAction): GameAction[] {
    if (this.reactions.length === 0) return [];
    return this.reactions.flatMap((reaction) => {
      if (reaction.check(action, this)) {
        return reaction.create(state);
      }
      return [];
    });
  }

  enabled(state: GameState): boolean {
    return true;
  }

  serialize(state: GameState): Card {
    return {
      name: this.name,
      id: this.id,
      rarity: this.rarity,
      description: this.description,
      enabled: this.enabled(state),
      targetSource: false,
      targetCandidate: false,
      targetDest: false,
    };
  }
}
