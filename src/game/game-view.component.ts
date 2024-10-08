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
  bounceInLeftOnEnterAnimation,
  headShakeAnimation,
} from 'angular-animations';
import { firstValueFrom } from 'rxjs';
import { UiAction } from '../services/actions';
import { Id, Item, ItemId } from '../services/collection-persistence.service';
import {
  GameRun,
  GameRunPersistenceService,
} from '../services/game-run-persistence.service';
import { GameRunService } from '../services/game-run.service';
import { ItemComponent } from '../ui/item.component';

@Component({
  selector: 'app-game-view',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ItemComponent, NgIf, NgForOf],
  animations: [
    headShakeAnimation({ anchor: 'usage' }),
    bounceInLeftOnEnterAnimation({ anchor: 'enter' }),
  ],
  template: `
    <div class="w-full bg-gray-200 rounded-lg relative">
      <div
        class="h-5 bg-teal-400 rounded-lg transition-width duration-1000"
        [style.width.%]="state().points"
        (transitionend)="nextAnimation()"
      ></div>
      <div
        class="absolute inset-0 flex justify-center items-center text-sm text-gray-700"
      >
        {{ state().points }}/{{ state().maxPoints }}
      </div>
    </div>
    <div class="flex">
      @for (item of items(); track item?.id) {
        <app-item
          class="cursor-pointer"
          [@usage]="{ value: animate, params: {} }"
          [@enter]
          (@enter.done)="nextAnimation()"
          [item]="item"
          [size]="3"
          (click)="onItemClick(item)"
        />
      }
    </div>
  `,
})
export class GameViewComponent implements OnInit {
  private readonly service = inject(GameRunPersistenceService);
  private readonly gameRunService = inject(GameRunService);

  readonly state = signal<GameRun>({
    points: 0,
    maxPoints: 100,
  });
  readonly items = signal<ItemId[]>([]);
  readonly uiActions = signal<UiAction<unknown>[]>([]);
  readonly uiActionsEmpty = computed(() => this.uiActions().length === 0);

  readonly persistedItems$ = this.service.gameItems$;
  readonly persistedState$ = this.service.gameState$;

  animate = false;

  async ngOnInit() {
    const state = await firstValueFrom(this.persistedState$);
    const items = await firstValueFrom(this.persistedItems$);
    const response = this.gameRunService.init(state, items);
    this.newActions(response.uiActions);
  }

  async _conciliate() {
    const state = await firstValueFrom(this.persistedState$);
    const items = await firstValueFrom(this.persistedItems$);
    this.gameRunService._conciliation(state, items);
  }

  async onItemClick(item: Item & Id) {
    this.animate = !this.animate;
    const response = this.gameRunService.play(item);
    this.newActions(response.uiActions);
    await this._conciliate();
  }

  private newActions(actions: UiAction<unknown>[]) {
    const canStartActions = this.uiActionsEmpty();
    console.log('can start', canStartActions, actions);
    this.uiActions.update((oldActions) => [...oldActions, ...actions]);
    if (canStartActions) {
      this.nextAnimation();
    }
  }

  nextAnimation() {
    if (this.uiActionsEmpty()) {
      console.log('empty');
      return;
    }
    const current = this.uiActions()[0];
    this.uiActions.update(([action, ...rest]) => rest);
    console.log('nextAnimation', current);
    if (current.type === 'itemAdd') {
      this.items.update((items) => [...items, current.payload as ItemId]);
    } else if (current.type === 'pointsChange') {
      this.state.update((state) => ({
        ...state,
        points: state.points + (current.payload as number),
      }));
    }
  }
}
