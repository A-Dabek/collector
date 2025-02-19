import { Rarity } from '../../ui/rarity';
import { CardPlayWasteAction } from '../actions/basic/card-play-waste.action';
import { CostHealthAction } from '../actions/cost-health.action';
import {
  GameAction,
  GameActionCreator,
  GameReactionCreator,
} from '../actions/game-actions';
import { GameState } from '../logic/engine';
import { CardName } from './access';

export interface Describable {
  name: string;
  description: string;
}

export interface CardState extends Describable {
  id: number;
  name: CardName;
  rarity: Rarity;
  enabled: boolean;
  targetSource: boolean;
  targetCandidate: boolean;
}

export interface GameCard {
  id: number;
  name: CardName;
  rarity: Rarity;

  get description(): string;

  get isWasted(): boolean;

  play(state: GameState): GameAction[];

  target?(state: GameState, targets: GameCard[]): GameAction[];

  onAction?(state: GameState, action: GameAction): GameAction[];

  onEffect?(state: GameState, actions: GameAction[]): GameAction[];

  enabled(state: GameState): boolean;

  waste(): void;

  serialize(state: GameState): CardState;
}

export abstract class BasePlayableCard implements GameCard {
  protected actions: (GameAction | GameActionCreator)[] = [];
  protected reactions: GameReactionCreator[] = [];
  protected wasted = false;

  abstract readonly name: CardName;
  abstract readonly rarity: Rarity;
  readonly id = Math.random();

  get description(): string {
    return [...this.costActions(), ...this.actions, ...this.reactions]
      .map((action) => action.description)
      .join(', ');
  }

  get isWasted(): boolean {
    return this.wasted;
  }

  waste(): void {
    this.wasted = true;
  }

  protected costActions(): GameAction[] {
    return [new CostHealthAction(this.rarity), new CardPlayWasteAction(this)];
  }

  play(state: GameState): GameAction[] {
    return [...this.costActions(), ...this.actions].flatMap((action) =>
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
    return [...this.costActions(), ...this.actions].every((action) => {
      return action.isApplicable(state);
    });
  }

  serialize(state: GameState): CardState {
    return {
      name: this.name,
      id: this.id,
      rarity: this.rarity,
      description: this.description,
      enabled: this.enabled(state),
      targetSource: state.modeTarget?.source.id === this.id,
      targetCandidate: !!state.modeTarget?.candidateIds.includes(this.id),
    };
  }
}
