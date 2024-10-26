import { GAME_ACTIONS, ResponseActions } from '../../actions/game-actions';
import { GameState } from '../../logic/engine';
import { PlayableCard } from '../card';

export class MedicinesCard implements PlayableCard {
  play(state: GameState): ResponseActions {
    return GAME_ACTIONS.setHealth(state.health + 10)(state);
  }

  enabled(state: GameState): boolean {
    return state.health < state.maxHealth;
  }
}
