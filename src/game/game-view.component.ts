import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import {
  bounceInRightOnEnterAnimation,
  bounceOutLeftOnLeaveAnimation,
  collapseOnLeaveAnimation,
  expandOnEnterAnimation,
  headShakeAnimation,
} from 'angular-animations';
import { GameRunService } from '../services/game-run.service';
import { IconComponent } from '../ui/icon.component';
import { UiAction } from './actions/ui-actions';
import { Card } from './library/access';
import { GameState } from './logic/engine';
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
    <app-bar
      class="mb-2"
      [current]="state().points"
      [max]="state().maxPoints"
      styleClass="bg-yellow-400"
      (animEnd)="nextAnimation($event)"
    />
    <app-bar
      [current]="state().health"
      [max]="state().maxHealth"
      styleClass="bg-red-300"
      (animEnd)="nextAnimation($event)"
    />
    <div class="flex flex-wrap absolute opacity-20">
      @for (space of spaceArray(); let i = $index; track i) {
        <app-icon
          class="px-1 py-5"
          name="stack"
          [size]="5"
          [@expand]
          (@expand.done)="nextAnimation($event)"
          [@shrink]
          (@shrink.done)="nextAnimation($event)"
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
          (@enter.done)="nextAnimation($event)"
          [@leave]
          (@leave.done)="nextAnimation($event)"
        />
      }
    </div>
  `,
})
export class GameViewComponent implements OnInit {
  private readonly gameRunService = inject(GameRunService);

  readonly state = signal<GameState>({
    points: 0,
    maxPoints: 100,
    health: 0,
    maxHealth: 100,
    cards: [],
    space: 10,
  });
  readonly spaceArray = computed(() => Array(this.state().space).fill(0));
  readonly uiActions = signal<UiAction[]>([]);
  readonly uiActionsEmpty = computed(() => this.uiActions().length === 0);

  async ngOnInit() {
    const uiActions = await this.gameRunService.init();
    this.onNewActions(uiActions);
  }

  async onPlay(card: Card) {
    const uiActions = await this.gameRunService.play(card);
    this.onNewActions(uiActions);
  }

  private onNewActions(actions: UiAction[]) {
    const canStartActions = this.uiActionsEmpty();
    console.log(this.uiActions());
    this.uiActions.update((oldActions) => [...oldActions, ...actions]);
    if (canStartActions) {
      this.nextAnimation();
    }
  }

  nextAnimation(trigger?: any) {
    console.log('[UI] next', trigger);
    if (this.uiActionsEmpty()) {
      console.log('[UI] next > empty');
      return;
    }
    const current = this.uiActions()[0];
    this.uiActions.update(([, ...rest]) => rest);
    this.state.update(current.update);
  }
}
