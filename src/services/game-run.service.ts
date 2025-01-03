import { inject, Injectable } from '@angular/core';
import { GameUiState } from '../game/actions/ui-actions';
import { CardState } from '../game/cards/card';
import { GameEngine } from '../game/logic/engine';
import { GameRunPersistenceService } from './game-run-persistence.service';

@Injectable({ providedIn: 'root' })
export class GameRunService {
  private readonly persistenceService = inject(GameRunPersistenceService);
  private readonly engine = new GameEngine();

  async newGame(): Promise<GameUiState[]> {
    const level = await this.persistenceService.getMaxPoints();
    return this.engine.startNewGame(level);
  }

  async finish(win: boolean): Promise<GameUiState[]> {
    await this.persistenceService.updateMaxPoints(win ? 1 : -1);
    return this.engine.finishCurrentGame();
  }

  async play(card: CardState): Promise<GameUiState[]> {
    return this.engine.play(card.id);
  }

  async target(card: CardState): Promise<GameUiState[]> {
    return this.engine.target(card.id);
  }
}
