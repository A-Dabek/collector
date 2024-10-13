import { NgForOf, NgIf } from '@angular/common';
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
  headShakeAnimation,
} from 'angular-animations';
import { Id, Item } from '../services/collection-persistence.service';
import { GameRunService } from '../services/game-run.service';
import { ItemComponent } from '../ui/item.component';
import { GameState } from './logic/state';
import { UiAction } from './ui-actions';

@Component({
  selector: 'app-game-view',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ItemComponent, NgIf, NgForOf],
  animations: [
    headShakeAnimation({ anchor: 'usage', duration: 500 }),
    bounceInRightOnEnterAnimation({ anchor: 'enter', duration: 500 }),
  ],
  template: `
    <div class="w-full bg-gray-200 rounded-lg relative">
      <div
        class="h-5 bg-teal-400 rounded-lg transition-width duration-500"
        [style.width.%]="state().points"
        (transitionend)="nextAnimation($event)"
      ></div>
      <div
        class="absolute inset-0 flex justify-center items-center text-sm text-gray-700"
      >
        {{ state().points }}/{{ state().maxPoints }}
      </div>
    </div>
    <div class="flex flex-wrap">
      @for (item of state().items; track item?.id) {
        <app-item
          class="cursor-pointer"
          [@usage]="{ value: animate, params: {} }"
          [@enter]
          (@enter.done)="nextAnimation($event)"
          [item]="item"
          [size]="5"
          (click)="onItemClick(item)"
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
    items: [],
  });
  readonly uiActions = signal<UiAction[]>([]);
  readonly uiActionsEmpty = computed(() => this.uiActions().length === 0);

  animate = false;

  async ngOnInit() {
    const uiActions = await this.gameRunService.init();
    this.onNewActions(uiActions);
  }

  async onItemClick(item: Item & Id) {
    this.animate = !this.animate;
    const uiActions = await this.gameRunService.play(item);
    this.onNewActions(uiActions);
  }

  private onNewActions(actions: UiAction[]) {
    const canStartActions = this.uiActionsEmpty();
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
