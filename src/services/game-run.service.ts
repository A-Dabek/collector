import { inject, Injectable } from '@angular/core';
import { Card } from '../game/library/access';
import { GameEngine } from '../game/logic/engine';
import { GameRunPersistenceService } from './game-run-persistence.service';

@Injectable({ providedIn: 'root' })
export class GameRunService {
  private readonly persistenceService = inject(GameRunPersistenceService);
  private readonly engine = new GameEngine();

  async newGame() {
    const response = this.engine.startNewGame();
    // await this.persistenceService.persist(response.persistenceActions);

    return response.uiActions;
  }

  async finish() {
    const response = this.engine.finishCurrentGame();
    // await this.persistenceService.persist(response.persistenceActions);

    return response.uiActions;
  }

  async play(card: Card) {
    const response = this.engine.play(card.id);
    // await this.persistenceService.persist(response.persistenceActions);

    return response.uiActions;
  }

  async target(card: Card) {
    const response = this.engine.target(card.id);
    // await this.persistenceService.persist(response.persistenceActions);

    return response.uiActions;
  }
}
