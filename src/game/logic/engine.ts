import { signal } from '@angular/core';
import { GAME_ACTIONS, ResponseActions } from '../actions/game-actions';
import { UI_ACTIONS } from '../actions/ui-actions';
import { PLAYABLE_LIBRARY } from '../cards/access';
import { NewGameCard } from '../cards/new-game.card';
import { Card } from '../library/access';
import { FinishGameCard } from '../cards/finish-game.card';
import { PlayableCard } from '../cards/card';
import { rarities, Rarity } from '../../ui/rarity';

export interface GameState {
  points: number;
  maxPoints: number;
  health: number;
  maxHealth: number;
  space: number;
  cards: Card[];
}

export class GameEngine {
  static readonly initialState: GameState = {
    points: 0,
    maxPoints: 10,
    health: 0,
    maxHealth: 10,
    space: 5,
    cards: [],
  };

  readonly state = signal<GameState>(GameEngine.initialState);

  startNewGame(): ResponseActions {
    const newGame = new NewGameCard();
    return this.playCard(newGame);
  }

  play(id: number): ResponseActions {
    const card = this.state().cards.find((card) => card.id === id);
    if (!card || !card.enabled) {
      return {
        nextState: this.state(),
        uiActions: [],
        persistenceActions: [],
      };
    }
    const playableCard = PLAYABLE_LIBRARY[card.name];
    return this.playCard(playableCard, card);
  }

  finishCurrentGame(): ResponseActions {
    const finishGame = new FinishGameCard();
    return this.playCard(finishGame);
  }

  private playCard(playableCard: PlayableCard, card?: Card) {
    const rarityToNumber = (rarity: Rarity): number => {
      const index = rarities.findIndex((r) => r === rarity);
      return index + 1; // Adding 1 to transform 0-based index to 1-based number
    };

    let nextState = this.state();

    let response = GAME_ACTIONS.setHealth(
      nextState.health - (card ? rarityToNumber(card.rarity) : 0),
    )(nextState);

    nextState = response.nextState;

    if (card) {
      response = this.combineActions(
        response,
        GAME_ACTIONS.cardWaste(card)(nextState),
      );
    }

    nextState = response.nextState;

    const afterMath = playableCard.play(nextState);
    response = this.combineActions(response, afterMath);
    nextState = response.nextState;
    nextState = this.updateCardsStatuses(nextState);
    this.state.set(nextState);
    return {
      ...response,
      uiActions: [
        UI_ACTIONS.setEnabledStatus(nextState.cards),
        ...response.uiActions,
        UI_ACTIONS.setState(nextState), // FIXME this overwrite setStatusEnabled actions
      ],
    };
  }

  private updateCardsStatuses(state: GameState) {
    const newCards = state.cards.map((card) => {
      const playableCard = PLAYABLE_LIBRARY[card.name];
      return {
        ...card,
        enabled: playableCard.enabled(state),
      };
    });
    return { ...state, cards: newCards };
  }

  private combineActions(
    prev: ResponseActions,
    next: ResponseActions,
  ): ResponseActions {
    const combinedUiActions = [...prev.uiActions, ...next.uiActions];

    const combinedPersistenceActions = [
      ...prev.persistenceActions,
      ...next.persistenceActions,
    ];

    return {
      nextState: next.nextState,
      uiActions: combinedUiActions,
      persistenceActions: combinedPersistenceActions,
    };
  }
}
