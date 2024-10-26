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
import { headShakeAnimation, heartBeatAnimation } from 'angular-animations';
import { IconComponent } from '../../ui/icon.component';
import { Card } from '../library/access';
import { interval } from 'rxjs';

@Component({
  selector: 'app-card',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IconComponent, NgIf],
  animations: [
    headShakeAnimation({ anchor: 'usage', duration: 500 }),
    heartBeatAnimation({ anchor: 'enabled', duration: 500, scale: 1.1 }),
  ],
  template: `
    <div *ngIf="card() as card" class="text-center">
      <div>{{ card.name }}</div>
      <app-icon
        class="cursor-pointer"
        [@usage]="{ value: animate, params: {} }"
        [@enabled]="{
          value: card.enabled && animateEnabled(),
          params: {},
        }"
        [name]="card.name"
        [color]="card.enabled ? '' : '#707070'"
        [rarity]="card.rarity"
        [size]="card.enabled ? 5 : 4"
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
  animateEnabled = computed(() => CardComponent.timerS());

  onUsage() {
    if (this.card()?.enabled) {
      this.animate = !this.animate;
      this.usage.emit();
    }
  }
}
