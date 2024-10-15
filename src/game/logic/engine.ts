import { signal } from '@angular/core';
import { GAME_ACTIONS, ResponseActions } from '../actions/game-actions';
import { Card, findCardInLibrary } from '../library/access';
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
  readonly state = signal<GameState>({
    points: 0,
    maxPoints: 100,
    health: 100,
    maxHealth: 100,
    space: 10,
    cards: [],
  });

  startNewGame(): ResponseActions {
    const health = 100;
    const initialCards: Card[] = [findCardInLibrary('card-pickup')];
    this.state.set({
      points: 0,
      maxPoints: 100,
      health,
      maxHealth: health,
      space: 10,
      cards: initialCards,
    });

    return GAME_ACTIONS.gameStart(initialCards, health);
  }

  play(card: Card): ResponseActions {
    return createCard(card);
  }
}
