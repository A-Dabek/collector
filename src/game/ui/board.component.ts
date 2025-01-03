import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
} from '@angular/core';
import {
  bounceInRightOnEnterAnimation,
  collapseOnLeaveAnimation,
  expandOnEnterAnimation,
  fadeOutUpOnLeaveAnimation,
  headShakeAnimation,
} from 'angular-animations';
import { IconComponent } from '../../ui/icon.component';
import { Card } from '../cards/card';
import { CardComponent } from './card.component';

@Component({
  selector: 'app-game-board',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IconComponent, CardComponent],
  animations: [
    headShakeAnimation({ anchor: 'usage', duration: 500 }),
    bounceInRightOnEnterAnimation({
      anchor: 'enter',
      duration: 500,
    }),
    fadeOutUpOnLeaveAnimation({
      anchor: 'leave',
      duration: 500,
    }),
    expandOnEnterAnimation({ anchor: 'expand', duration: 500 }),
    collapseOnLeaveAnimation({ anchor: 'shrink', duration: 500 }),
  ],
  template: `
    <div class="grid grid-cols-5 absolute opacity-20">
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
    <div class="grid grid-cols-5 relative">
      @for (item of cards(); track item.id; let index = $index) {
        <app-card
          class="px-1"
          [card]="item"
          (usage)="play.emit(item)"
          [@enter]
          [@leave]
        />
      }
    </div>
  `,
})
export class GameBoardComponent {
  readonly space = input.required<number>();
  readonly cards = input.required<Card[]>();
  readonly play = output<Card>();

  readonly spaceArray = computed(() => Array(this.space()).fill(0));
}
