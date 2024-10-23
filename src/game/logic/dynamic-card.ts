import { PersistenceAction } from '../../services/persistence-action.factory';
import {
  GAME_ACTIONS,
  InteractiveAction,
  ResponseActions,
} from '../actions/game-actions';
import { UiAction } from '../actions/ui-actions';
import { Card } from '../library/access';
import { CardEffect, LIBRARY } from '../library/library';
import { GameState } from './engine';

export function createCard(card: Card) {
  const definition = LIBRARY[card.name];
  const actions = definition.effects.map(createActionFromEffect);
  return (state: GameState) => GAME_ACTIONS.cardPlay(state, card, actions);
}

export function combineActions(
  state: GameState,
  actions: InteractiveAction[],
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

function createActionFromEffect(effect: CardEffect): InteractiveAction {
  const healFactor = 10;
  switch (effect.name) {
    case 'heal':
      return (state) =>
        GAME_ACTIONS.setHealth(
          state.health + (effect.repeats || 1) * healFactor,
        )(state);
    case 'draw':
      return GAME_ACTIONS.cardsDraw(effect.repeats || 1);
    case 'expand':
      return (state) =>
        GAME_ACTIONS.setSpace(state.space + (effect.repeats || 1))(state);
    case 'shrink':
      return (state) =>
        GAME_ACTIONS.setSpace(state.space - (effect.repeats || 1))(state);
    case 'earn':
      return (state) =>
        GAME_ACTIONS.setPoints(state.points + (effect.repeats || 1))(state);
    case 'destroy':
      return effect.random
        ? (state) => GAME_ACTIONS.destroyRandom(state, effect.repeats || 1)
        : (state) => GAME_ACTIONS.destroy(state);
  }
}
