import { GAME_ACTIONS, ResponseActions } from '../actions/game-actions';
import { Card } from '../library/access';
import { CardEffect, LIBRARY } from '../library/library';
import { GameState } from './engine';
import { UiAction } from '../actions/ui-actions';
import { PersistenceAction } from '../../services/persistence-action.factory';

export function createCard(card: Card): (state: GameState) => ResponseActions {
  const definition = LIBRARY[card.name];
  const actions = definition.effects.map(createActionFromEffect);
  return (state: GameState) => GAME_ACTIONS.cardPlay(state, card, actions);
}

export function combineActions(
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

function createActionFromEffect(
  effect: CardEffect,
): (state: GameState) => ResponseActions {
  const healFactor = 10;
  switch (effect.name) {
    case 'heal':
      return (state) =>
        GAME_ACTIONS.healthChange(state, (effect.repeats || 1) * healFactor);
    case 'draw':
      return (state) => GAME_ACTIONS.cardsDraw(state, effect.repeats || 1);
    case 'expand':
      return (state) => GAME_ACTIONS.spaceChange(state, effect.repeats || 1);
    case 'shrink':
      return (state) => GAME_ACTIONS.spaceChange(state, -(effect.repeats || 1));
    case 'earn':
      return (state) => GAME_ACTIONS.pointsChange(state, effect.repeats || 1);
    case 'destroy':
      return effect.random
        ? (state) => GAME_ACTIONS.destroyRandom(state, effect.repeats || 1)
        : (state) => GAME_ACTIONS.destroy(state);
  }
}
