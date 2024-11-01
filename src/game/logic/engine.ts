import { signal } from '@angular/core';
import { PLAYABLE_LIBRARY } from '../cards/access';
import { NewGameCard } from '../cards/new-game.card';
import { Card } from '../library/access';
import { FinishGameCard } from '../cards/finish-game.card';
import { PlayableCard } from '../cards/card';
import { GameAction, ResponseActions } from '../actions/game-actions';
import { SetEnabledStatusAction } from '../actions/set-enabled-status.action';
import { SetStateAction } from '../actions/set-state.action';
import { CardPlayAction } from '../actions/card-play.action';
import { CardTargetAction } from '../actions/card-target.action';

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

  finishCurrentGame(): ResponseActions {
    const finishGame = new FinishGameCard();
    return this.playCard(finishGame);
  }

  play(id: number): ResponseActions {
    const card = this.state().cards.find((card) => card.id === id);
    if (!card || !card.enabled) {
      return this.playCard(new SetStateAction(this.state()));
    }

    const playableCard = PLAYABLE_LIBRARY[card.name];
    if (!card.targetSource && playableCard.target) {
      return this.playCard({
        next: (state) => playableCard.target!(state, card),
      });
    } else {
      return this.playCard(new CardPlayAction(card, playableCard));
    }
  }

  target(id: number): ResponseActions {
    const card = this.state().cards.find((card) => card.id === id);
    const targetingCard = this.state().cards.find((card) => card.targetSource);
    if (!card || !targetingCard) {
      return this.playCard(new SetStateAction(this.state()));
    }
    const playableCard = PLAYABLE_LIBRARY[targetingCard.name];
    return this.playCard(
      new CardTargetAction(card, targetingCard, playableCard),
    );
  }

  private playCard(
    playable: PlayableCard | GameAction,
    card?: Card,
  ): ResponseActions {
    let response: ResponseActions;
    if ('play' in playable) {
      response = playable.play(this.state(), card as Card);
    } else {
      response = playable.next(this.state());
    }
    let nextState = response.nextState;
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
}
