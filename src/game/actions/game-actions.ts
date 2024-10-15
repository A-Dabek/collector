import {
  PersistenceAction,
  PersistenceActionFactory,
} from '../../services/persistence-action.factory';
import { Card, getRandomCard } from '../library/access';
import { combineActions } from '../logic/dynamic-card';
import { UI_ACTIONS, UiAction } from './ui-actions';

export interface ResponseActions {
  persistenceActions: PersistenceAction[];
  uiActions: UiAction[];
  description?: string;
}

export const GAME_ACTIONS = {
  gameStart: function (cards: Card[], maxHealth: number): ResponseActions {
    return combineActions([this.healthChange(maxHealth), this.cardsAdd(cards)]);
  },
  healthChange: function (payload: number): ResponseActions {
    return {
      uiActions: [UI_ACTIONS.healthChange(payload)],
      persistenceActions: [PersistenceActionFactory.setPoints(payload)],
    };
  },
  cardsAdd: function (cards: Card[]): ResponseActions {
    return {
      uiActions: cards.map(UI_ACTIONS.cardAdd),
      persistenceActions: cards.map((card) =>
        PersistenceActionFactory.setItem(card.name),
      ),
    };
  },
  cardPlay: function (card: Card, actions: ResponseActions[]): ResponseActions {
    return combineActions([
      this.cardCost(card.cost),
      ...actions,
      this.cardWaste(card),
    ]);
  },
  cardCost: function (cost: number): ResponseActions {
    return this.healthChange(-cost);
  },
  cardWaste: function (reference: Card): ResponseActions {
    return {
      uiActions: [UI_ACTIONS.cardWaste(reference)],
      persistenceActions: [],
    };
  },
  cardsDraw: function (count: number): ResponseActions {
    const randomCards = new Array(count).fill(0).map(getRandomCard);
    return this.cardsAdd(randomCards);
  },
  spaceChange: function (count: number): ResponseActions {
    return {
      uiActions: [UI_ACTIONS.changeSpace(count)],
      persistenceActions: [],
    };
  },
  destroy: function (): ResponseActions {
    return {
      uiActions: [],
      persistenceActions: [],
    };
  },
  destroyRandom: function (count: number): ResponseActions {
    return {
      uiActions: [],
      persistenceActions: [],
    };
  },
  pointsChange: function (points: number): ResponseActions {
    return {
      uiActions: [UI_ACTIONS.pointsChange(points)],
      persistenceActions: [],
    };
  },
};
