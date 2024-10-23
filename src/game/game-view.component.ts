import { animateChild } from '@angular/animations';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import {
  bounceInRightOnEnterAnimation,
  bounceOutLeftOnLeaveAnimation,
  collapseOnLeaveAnimation,
  expandOnEnterAnimation,
  headShakeAnimation,
} from 'angular-animations';
import { interval } from 'rxjs';
import { GameRunService } from '../services/game-run.service';
import { IconComponent } from '../ui/icon.component';
import { GameUiState, UiAction } from './actions/ui-actions';
import { Card } from './library/access';
import { CardComponent } from './ui/card.component';
import { ProgressBarComponent } from './ui/progress-bar.component';

@Component({
  selector: 'app-game-view',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CardComponent, ProgressBarComponent, IconComponent, RouterLink],
  animations: [
    headShakeAnimation({ anchor: 'usage', duration: 500 }),
    bounceInRightOnEnterAnimation({
      anchor: 'enter',
      duration: 500,
    }),
    bounceOutLeftOnLeaveAnimation({
      anchor: 'leave',
      duration: 500,
    }),
    expandOnEnterAnimation({ anchor: 'expand', duration: 500 }),
    collapseOnLeaveAnimation({ anchor: 'shrink', duration: 500 }),
  ],
  template: `
    <div class="flex mb-2">
      <div class="flex items-center space-x-2" (click)="onRestart()">
        <app-icon name="cycle" [style.display]="'inline'" [size]="1.5" />
        <span>Restart</span>
      </div>
      <div class="ms-1 text-amber-500">
        {{
          state().uiBlocked
            ? 'Playing ' + (lastUiAction()?.type || '...')
            : 'Your turn'
        }}
      </div>
    </div>
    <app-bar
      class="mb-2"
      [current]="state().points"
      [max]="state().maxPoints"
      styleClass="bg-yellow-400"
    />
    <app-bar
      [current]="state().health"
      [max]="state().maxHealth"
      styleClass="bg-red-300"
    />
    <div class="flex flex-wrap absolute opacity-20">
      @for (space of spaceArray(); let i = $index; track i) {
        <app-icon
          class="px-1 py-5"
          name="stack"
          [size]="5"
          [@expand]
          [@shrink]
        />
      }
    </div>
    <div class="flex flex-wrap relative">
      @for (item of state().cards; track item) {
        {{ item.enabled }}
        <app-card
          class="px-1"
          [card]="item"
          (usage)="onPlay(item)"
          [@enter]
          [@leave]
        />
      }
    </div>
  `,
})
export class GameViewComponent implements OnInit {
  private readonly gameRunService = inject(GameRunService);

  readonly state = signal<GameUiState>({
    points: 0,
    maxPoints: 100,
    health: 0,
    maxHealth: 100,
    cards: [],
    space: 10,
    uiBlocked: false,
  });

  readonly spaceArray = computed(() => Array(this.state().space).fill(0));
  readonly uiActions = signal<UiAction[]>([]);
  readonly lastUiAction = signal<UiAction | undefined>(undefined);

  constructor() {
    interval(1000)
      .pipe(takeUntilDestroyed())
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
    if (this.state().uiBlocked) return;
    const uiActions = await this.gameRunService.finish();
    this.onNewActions(uiActions);
    await this.startNewGame();
  }

  async onPlay(card: Card) {
    if (this.state().uiBlocked) return;
    const uiActions = await this.gameRunService.play(card);
    this.onNewActions(uiActions);
  }

  private onNewActions(actions: UiAction[]) {
    this.state.update((state) => ({ ...state, uiBlocked: true }));
    this.uiActions.update((oldActions) => [...oldActions, ...actions]);
  }

  private nextAnimation() {
    const current = this.uiActions()[0];
    this.lastUiAction.set(current);
    if (!current) {
      this.state.update((state) => ({ ...state, uiBlocked: false }));
      return;
    }
    this.uiActions.update(([, ...rest]) => rest);
    this.state.update(current.update);
  }
}
