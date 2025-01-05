import { NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { BehaviorSubject, interval, startWith, switchMap } from 'rxjs';
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

  readonly state = signal<GameUiState>({
    ...GameEngine.initialState,
    cards: [],
    effects: [],
  });

  readonly snapshots = signal<GameUiState[]>([]);
  readonly activeItem = signal<Describable | undefined>(undefined);
  private readonly now$ = new BehaviorSubject(0);

  constructor() {
    this.now$
      .pipe(
        takeUntilDestroyed(),
        switchMap(() => interval(500).pipe(startWith(0))),
      )
      .subscribe(() => {
        this.nextAnimation();
      });
  }

  async ngOnInit() {
    await this.startNewGame();
  }

  private async startNewGame() {
    const uiActions = await this.gameRunService.newGame();
    this.onNewActions(uiActions);
  }

  async onRestart() {
    const uiActions = await this.gameRunService.finish(false);
    this.onNewActions(uiActions);
    await this.startNewGame();
  }

  async onPlay(card: CardState) {
    this.activeItem.set(undefined);
    const uiActions = await this.gameRunService.play(card);
    this.onNewActions(uiActions);
  }

  async onTarget(targets: CardState[]) {
    const uiActions = await this.gameRunService.target(targets);
    this.onNewActions(uiActions);
  }

  async onHighlight(describable: Describable) {
    this.activeItem.set(describable);
  }

  private onNewActions(snapshots: GameUiState[]) {
    this.state.update((state) => ({ ...state }));
    this.snapshots.update((oldSnapshots) => {
      const allSnapshots = [...oldSnapshots, ...snapshots];
      // update `enabled` of every card in every snapshot to be the same as the last snapshot
      const lastSnapshot = allSnapshots[allSnapshots.length - 1].cards;
      allSnapshots.forEach((snapshot) => {
        snapshot.cards.forEach((card) => {
          const lastCard = lastSnapshot.find((c) => c.id === card.id);
          if (lastCard) {
            card.enabled = lastCard.enabled;
          }
        });
      });
      return allSnapshots;
    });
    this.now$.next(0);
  }

  private nextAnimation() {
    const current = this.snapshots()[0];
    if (!current) {
      // this.state.update((state) => ({ ...state }));
      return;
    }
    console.log('[UI] snapshot', current);
    this.snapshots.update(([, ...rest]) => rest);
    this.state.set(current);
  }

  protected readonly history = history;
}
