import {
  PersistenceAction,
  PersistenceActionFactory,
} from '../../services/persistence-action.factory';
import { Card, getRandomCard } from '../library/access';
import { GameState } from '../logic/engine';
import { UI_ACTIONS, UiAction } from './ui-actions';

export interface ResponseActions {
  persistenceActions: PersistenceAction[];
  uiActions: UiAction[];
  nextState: GameState;
}

export type InteractiveAction = (state: GameState) => ResponseActions;

export const GAME_ACTIONS = {
  gameStart: function (
    initialState: GameState,
    cards: Card[],
  ): InteractiveAction[] {
    return [this.setHealth(initialState.maxHealth), this.cardsAdd(cards)];
  },
  gameFinish: function (state: GameState): InteractiveAction[] {
    return [
      this.setPoints(0),
      this.setHealth(state.maxHealth),
      this.allCardWaste,
      this.setSpace(state.space),
    ];
  },
  setHealth: function (health: number): InteractiveAction {
    return function (state: GameState) {
      return {
        nextState: { ...state, health },
        uiActions: [UI_ACTIONS.setHealth(health)],
        persistenceActions: [PersistenceActionFactory.setHealth(health)],
      };
    };
  },
  cardsAdd: function (cards: Card[]): InteractiveAction {
    return function (state) {
      return {
        nextState: { ...state, cards: [...state.cards, ...cards] },
        uiActions: cards.map(UI_ACTIONS.cardAdd),
        persistenceActions: cards.map((card) =>
          PersistenceActionFactory.setItem(card.name),
        ),
      };
    };
  },
  cardPlay: function (
    state: GameState,
    card: Card,
    actions: ((state: GameState) => ResponseActions)[],
  ): InteractiveAction[] {
    return [
      this.cardCost(state, card.cost),
      ...actions,
      (state) => this.cardWaste(state, card),
    ];
  },
  cardCost: function (state: GameState, cost: number): InteractiveAction {
    return this.setHealth(state.health - cost);
  },
  cardWaste: function (state: GameState, reference: Card): ResponseActions {
    return {
      nextState: state,
      uiActions: [UI_ACTIONS.cardWaste(reference)],
      persistenceActions: [],
    };
  },
  allCardWaste: function (state: GameState): ResponseActions {
    return {
      nextState: state,
      uiActions: [UI_ACTIONS.allCardWaste()],
      persistenceActions: [],
    };
  },
  cardsDraw: function (count: number): InteractiveAction {
    const randomCards = new Array(count).fill(0).map(getRandomCard);
    return this.cardsAdd(randomCards);
  },
  setSpace: function (space: number): InteractiveAction {
    return function (state: GameState) {
      return {
        nextState: state,
        uiActions: [UI_ACTIONS.setSpace(space)],
        persistenceActions: [],
      };
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
  setPoints: function (points: number): InteractiveAction {
    return function (state: GameState) {
      return {
        nextState: state,
        uiActions: [UI_ACTIONS.setPoints(points)],
        persistenceActions: [],
      };
    };
  },
};
