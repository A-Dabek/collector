import { NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
  signal,
} from '@angular/core';
import {
  bounceInRightOnEnterAnimation,
  collapseOnLeaveAnimation,
  expandOnEnterAnimation,
  fadeOutUpOnLeaveAnimation,
  headShakeAnimation,
} from 'angular-animations';
import { IconComponent } from '../../ui/icon.component';
import { CardState } from '../cards/card';
import { CardComponent } from './card.component';

@Component({
  selector: 'app-game-board',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IconComponent, CardComponent, NgIf],
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
    <div class="grid grid-cols-5 gap-5 absolute opacity-20">
      @for (space of spaceArray(); let i = $index; track i) {
        <app-icon class="px-1" name="stack" [size]="5" [@expand] [@shrink] />
      }
    </div>
    <div class="grid grid-cols-5 gap-5 relative">
      @for (item of cards(); track item.id) {
        <app-card
          class="px-1"
          [card]="item"
          [isEnabled]="item.enabled"
          [isTargetSource]="item.targetSource"
          [isTargetCandidate]="
            item.targetCandidate && !selectedCards().includes(item)
          "
          (usage)="onUsage(item)"
          (highlight)="highlight.emit(item)"
          [@enter]
          [@leave]
        />
      }
    </div>
    <!--  Element to confirm selection when all items are selected  -->
    <div
      *ngIf="isTargeting() && targetCountMet()"
      class="flex justify-center items-center w-full h-full"
    >
      <button
        class="bg-white text-black py-2 px-4 rounded-md"
        (click)="onTargetConfirm()"
      >
        Confirm
      </button>
    </div>
  `,
})
export class GameBoardComponent {
  readonly space = input.required<number>();
  readonly cards = input.required<CardState[]>();
  readonly play = output<CardState>();
  readonly highlight = output<CardState>();

  readonly isTargeting = input<boolean>(false);
  readonly targetCount = input<number>(0);
  readonly target = output<CardState[]>();
  readonly targetCountMet = computed(
    () => this.selectedCards().length === this.targetCount(),
  );

  readonly spaceArray = computed(() => Array(this.space()).fill(0));

  readonly selectedCards = signal([] as CardState[]);

  onUsage(cardState: CardState) {
    if (this.isTargeting()) {
      this.selectedCards.update((cards) => {
        const newTargets = [...cards, cardState];
        return newTargets.length > this.targetCount()
          ? newTargets.slice(1)
          : newTargets;
      });
      return;
    }
    if (cardState.enabled) {
      this.play.emit(cardState);
    }
  }

  onTargetConfirm() {
    this.target.emit(this.selectedCards());
    this.selectedCards.update(() => []);
  }
}
