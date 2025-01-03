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
import { hingeAnimation, pulseAnimation } from 'angular-animations';
import { interval } from 'rxjs';
import { IconComponent } from '../../ui/icon.component';
import { CardState } from '../cards/card';

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
        [size]="size()"
        (click)="onUsage()"
      />
    </div>
  `,
})
export class CardComponent {
  static timer = interval(500).subscribe((a) =>
    CardComponent.timerS.set(a % 2 == 0),
  );
  static timerS = signal(false);

  @HostBinding() class = 'block';
  readonly size = input<number>(5);
  readonly card = input<CardState>();
  readonly usage = output();
  readonly highlight = output();
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
