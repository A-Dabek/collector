import { Card } from '../library/access';
import { GameState } from '../logic/engine';

export interface GameUiState extends GameState {}

export interface UiAction {
  update: (state: GameUiState) => GameUiState;
  type?: string;
}

export const UI_ACTIONS = {
  setPoints: function (payload: number): UiAction {
    return {
      type: 'setPoints',
      update: (state) => ({
        ...state,
        points: payload,
      }),
    };
  },
  setHealth: function (health: number): UiAction {
    return {
      type: 'healthChange',
      update: (state) => ({
        ...state,
        health,
      }),
    };
  },
  cardAdd: function (payload: Card): UiAction {
    return {
      type: 'cardAdd',
      update: (state) => ({
        ...state,
        cards: [...state.cards, payload],
      }),
    };
  },
  cardWaste: function (reference: Card): UiAction {
    return {
      type: 'cardWaste',
      update: (state) => ({
        ...state,
        cards: state.cards.filter((card) => card.id !== reference.id),
      }),
    };
  },
  allCardWaste: function (): UiAction {
    return {
      type: 'allCardWaste',
      update: (state) => ({
        ...state,
        cards: [],
      }),
    };
  },
  setSpace: function (target: number): UiAction {
    return {
      type: 'setSpace',
      update: (state) => ({
        ...state,
        space: target,
      }),
    };
  },
  setState: function (state: GameState): UiAction {
    return {
      type: 'setState',
      update: (uiState) => ({ ...uiState, ...state }),
    };
  },
};
