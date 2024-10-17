import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
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
  imports: [CardComponent, ProgressBarComponent, IconComponent],
  animations: [
    headShakeAnimation({ anchor: 'usage', duration: 500 }),
    bounceInRightOnEnterAnimation({ anchor: 'enter', duration: 500 }),
    bounceOutLeftOnLeaveAnimation({ anchor: 'leave', duration: 500 }),
    expandOnEnterAnimation({ anchor: 'expand', duration: 500 }),
    collapseOnLeaveAnimation({ anchor: 'shrink', duration: 500 }),
  ],
  template: `
    <div class="ms-1 text-amber-500">
      {{
        state().uiBlocked
          ? 'Playing ' + (lastUiAction()?.type || '...')
          : 'Your turn'
      }}
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
  private readonly destroyRef = inject(DestroyRef);

  readonly state = signal<GameUiState>({
    points: 0,
    maxPoints: 100,
    health: 0,
    maxHealth: 100,
    cards: [],
    space: 10,
    uiBlocked: true,
  });
  readonly spaceArray = computed(() => Array(this.state().space).fill(0));
  readonly uiActions = signal<UiAction[]>([]);
  readonly lastUiAction = signal<UiAction | undefined>(undefined);

  async ngOnInit() {
    const uiActions = await this.gameRunService.init();
    this.onNewActions(uiActions);
    interval(1000)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.nextAnimation('interval');
      });
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

  nextAnimation(trigger?: any) {
    console.log('[UI]', { trigger });
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
