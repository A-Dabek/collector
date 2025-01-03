import { Rarity } from '../../ui/rarity';
import { CardAddAction } from '../actions/card-add.action';
import { SetHealthAction } from '../actions/set-health.action';
import { SetSpaceAction } from '../actions/set-space.action';
import { findCardInLibrary } from '../library/access';
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

  override play(state: GameState) {
    const initialCards: CardName[] = ['token', 'token', 'raise-zombie'];
    return [
      new SetHealthAction(this.initialState.maxHealth),
      new SetSpaceAction(this.initialState.space),
      new CardAddAction(initialCards),
    ];
  }
}
