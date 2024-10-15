import {
  PersistenceAction,
  PersistenceActionFactory,
} from '../../services/persistence-action.factory';
import { Card, getRandomCard } from '../library/access';
import { combineActions } from '../logic/dynamic-card';
import { UI_ACTIONS, UiAction } from './ui-actions';
import { GameState } from '../logic/engine';
import { state } from '@angular/animations';

export interface ResponseActions {
  persistenceActions: PersistenceAction[];
  uiActions: UiAction[];
  nextState: GameState;
}

export const GAME_ACTIONS = {
  gameStart: function (
    state: GameState,
    cards: Card[],
    maxHealth: number,
  ): ResponseActions {
    return combineActions(state, [
      (state) => this.healthChange(state, maxHealth),
      (state) => this.cardsAdd(state, cards),
    ]);
  },
  healthChange: function (state: GameState, payload: number): ResponseActions {
    return {
      nextState: state,
      uiActions: [UI_ACTIONS.healthChange(payload)],
      persistenceActions: [PersistenceActionFactory.setPoints(payload)],
    };
  },
  cardsAdd: function (state: GameState, cards: Card[]): ResponseActions {
    return {
      nextState: state,
      uiActions: cards.map(UI_ACTIONS.cardAdd),
      persistenceActions: cards.map((card) =>
        PersistenceActionFactory.setItem(card.name),
      ),
    };
  },
  cardPlay: function (
    state: GameState,
    card: Card,
    actions: ((state: GameState) => ResponseActions)[],
  ): ResponseActions {
    return combineActions(state, [
      (state) => this.cardCost(state, card.cost),
      ...actions,
      (state) => this.cardWaste(state, card),
    ]);
  },
  cardCost: function (state: GameState, cost: number): ResponseActions {
    return this.healthChange(state, -cost);
  },
  cardWaste: function (state: GameState, reference: Card): ResponseActions {
    return {
      nextState: state,
      uiActions: [UI_ACTIONS.cardWaste(reference)],
      persistenceActions: [],
    };
  },
  cardsDraw: function (state: GameState, count: number): ResponseActions {
    const randomCards = new Array(count).fill(0).map(getRandomCard);
    return this.cardsAdd(state, randomCards);
  },
  spaceChange: function (state: GameState, count: number): ResponseActions {
    return {
      nextState: state,
      uiActions: [UI_ACTIONS.changeSpace(count)],
      persistenceActions: [],
    };
  },
  destroy: function (state: GameState): ResponseActions {
    return {
      nextState: state,
      uiActions: [],
      persistenceActions: [],
    };
  },
  destroyRandom: function (state: GameState, count: number): ResponseActions {
    function randomShuffleCards() {
      const shuffledCards = state.cards.slice();
      for (let i = shuffledCards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledCards[i], shuffledCards[j]] = [
          shuffledCards[j],
          shuffledCards[i],
        ];
      }
      return shuffledCards;
    }
    const shuffled = randomShuffleCards();
    if (count > shuffled.length) count = shuffled.length;
    return {
      nextState: state,
      uiActions: Array(count)
        .fill(0)
        .map((_, index) => UI_ACTIONS.cardWaste(shuffled[0])),
      persistenceActions: [],
    };
  },
  pointsChange: function (state: GameState, points: number): ResponseActions {
    return {
      nextState: state,
      uiActions: [UI_ACTIONS.pointsChange(points)],
      persistenceActions: [],
    };
  },
};
