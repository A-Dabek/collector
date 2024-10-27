import { signal } from '@angular/core';
import { PLAYABLE_LIBRARY } from '../cards/access';
import { NewGameCard } from '../cards/new-game.card';
import { Card } from '../library/access';
import { FinishGameCard } from '../cards/finish-game.card';
import { PlayableCard } from '../cards/card';
import { rarities, Rarity } from '../../ui/rarity';
import { GameAction, ResponseActions } from '../actions/game-actions';
import { SetEnabledStatusAction } from '../actions/set-enabled-status.action';
import { SetStateAction } from '../actions/set-state.action';
import { CardWasteAction } from '../actions/card-waste.action';
import { AddHealthAction } from '../actions/add-health.action';
import { CostHealthAction } from '../actions/cost-health.action';
import { combineActions } from './dynamic-card';

export interface GameState {
  points: number;
  maxPoints: number;
  health: number;
  maxHealth: number;
  space: number;
  cards: Card[];
}

export class GameEngine {
  static readonly initialState: GameState = {
    points: 0,
    maxPoints: 10,
    health: 0,
    maxHealth: 10,
    space: 5,
    cards: [],
  };

  readonly state = signal<GameState>(GameEngine.initialState);

  startNewGame(): ResponseActions {
    const newGame = new NewGameCard();
    return this.playCard(newGame);
  }

  play(id: number): ResponseActions {
    const card = this.state().cards.find((card) => card.id === id);
    if (!card || !card.enabled) {
      return {
        nextState: this.state(),
        uiActions: [],
        persistenceActions: [],
      };
    }
    const playableCard = PLAYABLE_LIBRARY[card.name];
    return this.playCard(playableCard, card);
  }

  finishCurrentGame(): ResponseActions {
    const finishGame = new FinishGameCard();
    return this.playCard(finishGame);
  }

  private playCard(playableCard: PlayableCard, card?: Card) {
    let nextState = this.state();

    let response = card
      ? combineActions(nextState, [
          new CostHealthAction(card.rarity),
          new CardWasteAction([card]),
          { next: (state) => playableCard.play(state, card) } as GameAction,
        ])
      : playableCard.play(nextState, {} as Card);

    nextState = response.nextState;
    nextState = this.updateCardsStatuses(nextState);
    this.state.set(nextState);
    return {
      ...response,
      uiActions: [
        new SetEnabledStatusAction(nextState.cards),
        ...response.uiActions,
        new SetStateAction(nextState), // FIXME this overwrite setStatusEnabled actions
      ],
    };
  }

  private updateCardsStatuses(state: GameState) {
    const newCards = state.cards.map((card) => {
      const playableCard = PLAYABLE_LIBRARY[card.name];
      return {
        ...card,
        enabled: playableCard.enabled(state),
      };
    });
    return { ...state, cards: newCards };
  }

  private combineActions(
    prev: ResponseActions,
    next: ResponseActions,
  ): ResponseActions {
    const combinedUiActions = [...prev.uiActions, ...next.uiActions];

    const combinedPersistenceActions = [
      ...prev.persistenceActions,
      ...next.persistenceActions,
    ];

    return {
      nextState: next.nextState,
      uiActions: combinedUiActions,
      persistenceActions: combinedPersistenceActions,
    };
  }
}
