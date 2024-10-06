import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
  OnInit,
} from '@angular/core';
import { GameRunPersistenceService } from '../services/game-run-persistence.service';
import { ItemComponent } from '../ui/item.component';

@Component({
  selector: 'app-game-view',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AsyncPipe, ItemComponent, NgIf, NgForOf],
  animations: [],
  template: `
    <div class="flex flex-col">
      <div
        *ngIf="state$ | async as state"
        class="w-full bg-gray-200 rounded-lg relative"
      >
        <div
          class="h-5 bg-teal-400 rounded-lg transition-width duration-300"
          [style.width.%]="state.points"
        ></div>
        <div
          class="absolute inset-0 flex justify-center items-center text-sm text-gray-700"
        >
          {{ state.points }}/{{ state.maxPoints }}
        </div>
      </div>
      @for (item of items$ | async; track item?.id) {
        <div class="w-1/5">
          <app-item [item]="item" [size]="3" />
        </div>
      }
    </div>
  `,
})
export class GameViewComponent implements OnInit {
  private readonly service = inject(GameRunPersistenceService);

  readonly items$ = this.service.gameItems$;
  readonly state$ = this.service.gameState$;

  ngOnInit() {}
}
