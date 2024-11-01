import { NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  HostBinding,
  input,
  output,
  signal,
} from '@angular/core';
import {
  fadeOutUpAnimation,
  fadeOutUpBigAnimation,
  headShakeAnimation,
  heartBeatAnimation,
  slideInUpAnimation,
  slideOutUpAnimation,
  swingAnimation,
  wobbleAnimation,
  pulseAnimation,
  hingeAnimation,
  zoomOutAnimation,
} from 'angular-animations';
import { IconComponent } from '../../ui/icon.component';
import { Card } from '../library/access';
import { interval } from 'rxjs';

@Component({
  selector: 'app-card',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IconComponent, NgIf],
  animations: [
    pulseAnimation({ anchor: 'enabled', duration: 500 }),
    pulseAnimation({ anchor: 'target', duration: 500, scale: 1.1 }),
    hingeAnimation({
      anchor: 'targeting',
      duration: 500,
    }),
  ],
  template: `
    <div *ngIf="card() as card" class="text-center">
      <div>{{ card.name }}</div>
      <app-icon
        class="cursor-pointer"
        [@target]="{
          value: card.targetCandidate && animateEnabled(),
          params: {},
        }"
        [@targeting]="{
          value: card.targetSource && animateEnabled(),
          params: {},
        }"
        [name]="card.name"
        [color]="card.enabled ? '' : '#707070'"
        [rarity]="card.rarity"
        [size]="5"
        (click)="onUsage()"
      />
      <div class="text-xs">{{ card.description }}</div>
    </div>
  `,
})
export class CardComponent {
  static timer = interval(500).subscribe((a) =>
    CardComponent.timerS.set(a % 2 == 0),
  );
  static timerS = signal(false);

  @HostBinding() class = 'block';
  readonly card = input<Card>();
  readonly usage = output();
  animate = false;
  readonly animateEnabled = computed(() => CardComponent.timerS());

  readonly isTarget = computed(() => this.card()?.targetCandidate);
  readonly isTargeting = computed(() => this.card()?.targetSource);
  readonly isEnabled = computed(
    () => this.card()?.enabled && !this.isTarget() && !this.isTargeting(),
  );

  onUsage() {
    if (this.card()?.enabled) {
      this.animate = !this.animate;
      this.usage.emit();
    }
  }
}
