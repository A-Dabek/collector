import { inject, Injectable } from '@angular/core';
import { CardState } from '../game/cards/card';
import { FinishGameCard } from '../game/cards/finish-game.card';
import { NewGameCard } from '../game/cards/new-game.card';
import { GameEngine } from '../game/logic/engine';
import { GameRunPersistenceService } from './game-run-persistence.service';

@Injectable({ providedIn: 'root' })
export class GameRunService {
  private readonly persistenceService = inject(GameRunPersistenceService);
  private readonly engine = new GameEngine();

  get snapshots$() {
    return this.engine.snapshots$;
  }

  async newGame() {
    const level = await this.persistenceService.getMaxPoints();
    this.engine.playCard(new NewGameCard(level));
  }

  async finish(win: boolean) {
    await this.persistenceService.updateMaxPoints(win ? 1 : -1);
    this.engine.playCard(new FinishGameCard());
  }

  play(card: CardState) {
    this.engine.playCardId(card.id);
  }

  target(cardStates: CardState[]) {
    const targetIds = cardStates.map((card) => card.id);
    this.engine.targetReady$.next({ ids: targetIds });
  }
}
