import { GAME_ACTIONS, ResponseActions } from '../actions/game-actions';
import { Card, findCardInLibrary } from '../library/access';
import { combineActions } from '../logic/dynamic-card';
import { GameEngine, GameState } from '../logic/engine';
import { PlayableCard } from './card';

export class NewGameCard implements PlayableCard {
  private readonly initialState: GameState = {
    ...GameEngine.initialState,
  };

  play(_: GameState): ResponseActions {
    const initialCards: Card[] = [
      findCardInLibrary('card-pickup'),
      findCardInLibrary('card-pickup'),
    ];
    return combineActions(this.initialState, [
      GAME_ACTIONS.setHealth(this.initialState.maxHealth),
      GAME_ACTIONS.setSpace(this.initialState.space),
      GAME_ACTIONS.cardsAdd(initialCards),
    ]);
  }

  enabled(_: GameState): boolean {
    return true;
  }
}
