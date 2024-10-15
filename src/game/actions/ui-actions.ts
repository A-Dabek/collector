import { Card } from '../library/access';
import { GameState } from '../logic/engine';

export interface GameUiState extends GameState {}

export interface UiAction {
  update: (state: GameUiState) => GameUiState;
  type?: string;
}

export const UI_ACTIONS = {
  pointsChange: function (payload: number): UiAction {
    return {
      type: 'pointsChange',
      update: (state) => ({
        ...state,
        points: state.points + payload,
      }),
    };
  },
  healthChange: function (payload: number): UiAction {
    return {
      type: 'healthChange',
      update: (state) => ({
        ...state,
        health: state.health + payload,
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
        cards: state.cards.filter((card) => card !== reference),
      }),
    };
  },
  changeSpace: function (payload: number): UiAction {
    return {
      type: 'expandSpace',
      update: (state) => ({
        ...state,
        space: state.space + payload,
      }),
    };
  },
};
