import { GAME_ACTIONS, ResponseActions } from '../actions/game-actions';
import { Card, findCardInLibrary } from '../library/access';
import { combineActions } from '../logic/dynamic-card';
import { GameState } from '../logic/engine';
import { PlayableCard } from './card';

export class NewGameCard implements PlayableCard {
  private readonly initialState: GameState = {
    points: 0,
    maxPoints: 100,
    health: 0,
    maxHealth: 100,
    space: 4,
    cards: [],
  };

  play(_: GameState): ResponseActions {
    const initialCards: Card[] = [
      findCardInLibrary('card-pickup'),
      findCardInLibrary('card-pickup'),
      // findCardInLibrary('spikes-init'),
    ];
    return combineActions(this.initialState, [
      GAME_ACTIONS.setHealth(this.initialState.maxHealth),
      GAME_ACTIONS.cardsAdd(initialCards),
    ]);
  }

  enabled(state: GameState): boolean {
    return true;
  }
}
