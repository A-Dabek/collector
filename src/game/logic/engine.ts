import { signal } from '@angular/core';
import { GAME_ACTIONS, ResponseActions } from '../actions/game-actions';
import { UI_ACTIONS } from '../actions/ui-actions';
import { PLAYABLE_LIBRARY } from '../cards/access';
import { NewGameCard } from '../cards/new-game.card';
import { Card } from '../library/access';
import { FinishGameCard } from '../cards/finish-game.card';
import { PlayableCard } from '../cards/card';
import { rarities, Rarity } from '../../ui/rarity';

export interface GameState {
  points: number;
  maxPoints: number;
  health: number;
  maxHealth: number;
  space: number;
  cards: Card[];
}

export class GameEngine {
  private readonly initialState: GameState = {
    points: 0,
    maxPoints: 100,
    health: 0,
    maxHealth: 100,
    space: 10,
    cards: [],
  };

  readonly state = signal<GameState>(this.initialState);

  startNewGame(): ResponseActions {
    const newGame = new NewGameCard();
    return this.playCard(newGame);
  }

  play(card: Card): ResponseActions {
    const playableCard = PLAYABLE_LIBRARY[card.name];
    return this.playCard(playableCard, card);
  }

  finishCurrentGame(): ResponseActions {
    const finishGame = new FinishGameCard();
    return this.playCard(finishGame);
  }

  private playCard(playableCard: PlayableCard, card?: Card) {
    const rarityToNumber = (rarity: Rarity): number => {
      const index = rarities.findIndex((r) => r === rarity);
      return index + 1; // Adding 1 to transform 0-based index to 1-based number
    };

    let nextState = this.state();

    let response = GAME_ACTIONS.setHealth(
      nextState.health - (card ? rarityToNumber(card.rarity) : 0),
    )(nextState);

    nextState = response.nextState;

    if (card) {
      const response2 = GAME_ACTIONS.cardWaste(card)(nextState);
      response = {
        ...response2,
        uiActions: [...response.uiActions, ...response2.uiActions],
        persistenceActions: [
          ...response.persistenceActions,
          ...response2.persistenceActions,
        ],
      };
    }

    nextState = response.nextState;

    const afterMath = playableCard.play(nextState);
    nextState = afterMath.nextState;
    nextState = this.updateCardsStatuses(nextState);
    this.state.set(nextState);
    return {
      ...afterMath,
      uiActions: [
        ...response.uiActions,
        ...afterMath.uiActions,
        UI_ACTIONS.setState(nextState),
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
}
