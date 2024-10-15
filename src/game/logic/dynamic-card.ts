import { GAME_ACTIONS, ResponseActions } from '../actions/game-actions';
import { Card } from '../library/access';
import { CardEffect, LIBRARY } from '../library/library';

export function createCard(card: Card): ResponseActions {
  const definition = LIBRARY[card.name];
  const actions = definition.effects.map(createActionFromEffect);
  return GAME_ACTIONS.cardPlay(card, actions);
}

export function combineActions(actions: ResponseActions[]): ResponseActions {
  const combinedPersistenceActions = actions.flatMap(
    (action) => action.persistenceActions,
  );
  const combinedUiActions = actions.flatMap((action) => action.uiActions);

  return {
    persistenceActions: combinedPersistenceActions,
    uiActions: combinedUiActions,
  };
}

function createActionFromEffect(effect: CardEffect): ResponseActions {
  const healFactor = 10;
  switch (effect.name) {
    case 'heal':
      return GAME_ACTIONS.healthChange((effect.repeats || 1) * healFactor);
    case 'draw':
      return GAME_ACTIONS.cardsDraw(effect.repeats || 1);
    case 'expand':
      return GAME_ACTIONS.spaceChange(effect.repeats || 1);
    case 'shrink':
      return GAME_ACTIONS.spaceChange(-(effect.repeats || 1));
    case 'earn':
      return GAME_ACTIONS.pointsChange(effect.repeats || 1);
    case 'destroy':
      return effect.random
        ? GAME_ACTIONS.destroyRandom(effect.repeats || 1)
        : GAME_ACTIONS.destroy();
  }
}
