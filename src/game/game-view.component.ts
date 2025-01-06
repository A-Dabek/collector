import { NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { concatMap, delay, of, tap } from 'rxjs';
import { GameRunService } from '../services/game-run.service';
import { GameUiState } from './actions/ui-actions';
import { CardState, Describable } from './cards/card';
import { GameEngine } from './logic/engine';
import { GameBarsComponent } from './ui/bars.component';
import { GameBoardComponent } from './ui/board.component';
import { GameDescriptionComponent } from './ui/description.component';
import { GameEffectsComponent } from './ui/effects.component';
import { GameMenuComponent } from './ui/menu.component';

@Component({
  selector: 'app-game-view',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    GameMenuComponent,
    GameBarsComponent,
    GameBoardComponent,
    GameDescriptionComponent,
    NgIf,
    GameEffectsComponent,
  ],
  template: `
    <div class="flex flex-col h-svh pt-2">
      <app-game-menu (restart)="onRestart()" />
      <app-game-bars
        class="block mt-1.5 mb-1.5"
        [points]="state().points"
        [maxPoints]="state().maxPoints"
        [health]="state().health"
        [maxHealth]="state().maxHealth"
      />
      <app-game-effects
        class="block mb-1.5"
        [effects]="state().effects"
        (highlight)="onHighlight($event)"
      />
      <app-game-board
        [isTargeting]="state().mode === 'target'"
        [targetCount]="state().modeTarget?.count || 0"
        [space]="state().space"
        [cards]="state().cards"
        (play)="onPlay($event)"
        (highlight)="onHighlight($event)"
        (target)="onTarget($event)"
      />
      <app-game-description
        class="block mt-auto mb-auto"
        *ngIf="activeItem() as card"
        [name]="card.name"
        [description]="card.description"
      />
    </div>
  `,
})
export class GameViewComponent implements OnInit {
  private readonly gameRunService = inject(GameRunService);
  private readonly destroy$ = inject(DestroyRef);

  readonly state = signal<GameUiState>({
    ...GameEngine.initialState,
    cards: [],
    effects: [],
  });

  readonly activeItem = signal<Describable | undefined>(undefined);

  async ngOnInit() {
    this.gameRunService.newGame();
    this.gameRunService.snapshots$
      .pipe(
        takeUntilDestroyed(this.destroy$),
        concatMap((snapshot) =>
          of(snapshot).pipe(
            tap((snapshot) => this.state.set(snapshot)),
            delay(250),
          ),
        ),
      )
      .subscribe();
  }

  private async startNewGame() {
    await this.gameRunService.newGame();
  }

  async onRestart() {
    await this.gameRunService.finish(false);
    await this.startNewGame();
  }

  async onPlay(card: CardState) {
    this.activeItem.set(undefined);
    this.gameRunService.play(card);
  }

  async onTarget(targets: CardState[]) {
    this.gameRunService.target(targets);
  }

  async onHighlight(describable: Describable) {
    this.activeItem.set(describable);
  }
}
