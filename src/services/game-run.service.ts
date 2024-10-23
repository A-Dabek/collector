import { inject, Injectable, signal } from '@angular/core';
import { GameUiState } from '../game/actions/ui-actions';
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
    const response = this.engine.play(card);
    // await this.persistenceService.persist(response.persistenceActions);

    return response.uiActions;
  }
}
