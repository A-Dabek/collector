import { signal } from '@angular/core';
import { PersistenceAction } from '../../services/persistence-action.factory';
import { GAME_ACTIONS, ResponseActions } from '../actions/game-actions';
import { UI_ACTIONS, UiAction } from '../actions/ui-actions';
import { PLAYABLE_LIBRARY } from '../cards/access';
import { NewGameCard } from '../cards/new-game.card';
import { Card } from '../library/access';
import { createCard } from './dynamic-card';

export interface GameState {
  points: number;
  maxPoints: number;
  health: number;
  maxHealth: number;
  space: number;
  cards: Card[];
}

export class GameEngine {
  private readonly initialState: GameState = {
    points: 0,
    maxPoints: 100,
    health: 0,
    maxHealth: 100,
    space: 10,
    cards: [],
  };

  readonly state = signal<GameState>(this.initialState);

  startNewGame(): ResponseActions {
    const newGame = new NewGameCard();

    const afterMath = newGame.play(this.state());
    this.updateState(afterMath.nextState);
    return {
      ...afterMath,
      uiActions: [...afterMath.uiActions, UI_ACTIONS.setState(this.state())],
    };
  }

  play(card: Card): ResponseActions {
    const playableCard = PLAYABLE_LIBRARY[card.name];
    const afterMath = playableCard.play(this.state());
    this.updateState(afterMath.nextState);
    return {
      ...afterMath,
      uiActions: [...afterMath.uiActions, UI_ACTIONS.setState(this.state())],
    };
  }

  private updateState(state: GameState) {
    this.state.set(state);
    const newCards = this.state().cards.map((card) => {
      const playableCard = PLAYABLE_LIBRARY[card.name];
      console.log('state', this.state());
      console.log(card.name, playableCard.enabled(this.state()));
      return {
        ...card,
        enabled: playableCard.enabled(this.state()),
      };
    });
    this.state.update((state) => ({ ...state, cards: newCards }));
  }

  finishCurrentGame(): ResponseActions {
    this.state.set({
      ...this.initialState,
      cards: [],
    });

    const afterMath = this.applyActions(
      this.state(),
      GAME_ACTIONS.gameFinish(this.state()),
    );
    this.state.set(afterMath.nextState);
    return afterMath;
  }

  // TODO remove
  private applyActions(
    state: GameState,
    actions: ((state: GameState) => ResponseActions)[],
  ): ResponseActions {
    let combinedPersistenceActions: PersistenceAction[] = [];
    let combinedUiActions: UiAction[] = [];
    let nextState = state;
    actions.forEach((action) => {
      const response = action(nextState);
      combinedPersistenceActions = combinedPersistenceActions.concat(
        response.persistenceActions,
      );
      combinedUiActions = combinedUiActions.concat(response.uiActions);
      nextState = response.nextState;
    });

    return {
      persistenceActions: combinedPersistenceActions,
      uiActions: combinedUiActions,
      nextState,
    };
  }
}
