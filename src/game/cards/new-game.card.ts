import { Rarity } from '../../ui/rarity';
import { SetHealthAction } from '../actions/basic/set-health.action';
import { CardAddAction } from '../actions/basic/card-add.action';
import { SetSpaceAction } from '../actions/basic/set-space.action';
import { GameEngine, GameState } from '../logic/engine';
import { CardName } from './access';
import { BasePlayableCard } from './card';

export class NewGameCard extends BasePlayableCard {
  override name: CardName = 'card-2-diamonds';
  override rarity: Rarity = 'common';

  private get initialState(): GameState {
    return { ...GameEngine.initialState, maxPoints: this.level };
  }

  constructor(private readonly level: number) {
    super();
  }

  override costActions() {
    return [];
  }

  override play(state: GameState) {
    const initialCards: CardName[] = [
      'token',
      'raise-zombie',
      'parrot-head',
      'ouroboros',
    ];
    // const initialCards: CardName[] = ['piggy-bank', 'spikes-init'];
    return [
      new SetHealthAction(this.initialState.maxHealth),
      new SetSpaceAction(this.initialState.space),
      new CardAddAction(initialCards),
    ];
  }
}
