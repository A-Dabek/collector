import { Rarity } from '../../ui/rarity';
import { CardAddAction } from '../actions/card-add.action';
import { SetHealthAction } from '../actions/set-health.action';
import { SetSpaceAction } from '../actions/set-space.action';
import { findCardInLibrary } from '../library/access';
import { CardName } from '../library/library';
import { GameEngine, GameState } from '../logic/engine';
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
    const initialCards: CardName[] = [
      'plain-padlock',
      'plain-padlock',
      'token',
    ];
    return [
      new SetHealthAction(this.initialState.maxHealth),
      new SetSpaceAction(this.initialState.space),
      new CardAddAction(initialCards),
    ];
  }
}
