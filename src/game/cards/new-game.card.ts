import { ResponseActions } from '../actions/game-actions';
import { Card, findCardInLibrary } from '../library/access';
import { combineActions } from '../logic/dynamic-card';
import { GameEngine, GameState } from '../logic/engine';
import { PlayableCard } from './card';
import { SetHealthAction } from '../actions/set-health.action';
import { SetSpaceAction } from '../actions/set-space.action';
import { CardAddAction } from '../actions/card-add.action';

export class NewGameCard implements PlayableCard {
  private readonly initialState: GameState = {
    ...GameEngine.initialState,
  };

  play(state: GameState, card: Card): ResponseActions {
    const initialCards: Card[] = [
      findCardInLibrary('hammer-break'),
      findCardInLibrary('card-pickup'),
      // findCardInLibrary('card-pickup'),
    ];
    return combineActions(this.initialState, [
      new SetHealthAction(this.initialState.maxHealth),
      new SetSpaceAction(this.initialState.space),
      new CardAddAction(initialCards),
    ]);
  }

  enabled(_: GameState): boolean {
    return true;
  }
}
