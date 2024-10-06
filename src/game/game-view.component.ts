import { AsyncPipe, NgIf } from '@angular/common';
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
  imports: [AsyncPipe, ItemComponent, NgIf],
  animations: [],
  styles: [
    `
      .progress-bar {
        width: 100%;
        background-color: #e0e0e0;
        border-radius: 8px;
        position: relative;
      }

      .progress-bar__fill {
        height: 20px;
        background-color: #76c7c0;
        border-radius: 8px;
        transition: width 0.3s ease-in-out;
      }

      .progress-bar__text {
        position: relative;
        text-align: center;
        top: -50%;
        font-size: 14px;
        color: #555;
      }
    `,
  ],
  template: `
    <div class="pure-g">
      <div class="pure-u-1-1" *ngIf="state$ | async as state">
        <div class="progress-bar">
          <div class="progress-bar__fill" [style.width.%]="state.points"></div>
        </div>
        <div class="progress-bar__text">
          {{ state.points }}/{{ state.maxPoints }}
        </div>
      </div>
      @for (item of items$ | async; track item.id; let index = $index) {
        <div class="pure-u-1-5">
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
