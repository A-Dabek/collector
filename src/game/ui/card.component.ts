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
import { rarityDisabledColors } from '../../ui/rarity';
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
          value: isTargetCandidate() && animateEnabled(),
          params: {},
        }"
        [@targeting]="{
          value: isTargetSource() && animateEnabled(),
          params: {},
        }"
        [name]="card.name"
        [color]="isEnabled() ? '' : rarityDisabledColors[card.rarity]"
        [rarity]="card.rarity"
        [size]="size()"
        (click)="usage.emit()"
      />
    </div>
  `,
})
export class CardComponent {
  static timer = interval(500).subscribe((a) =>
    CardComponent.timerS.set(a % 2 == 0),
  );
  static timerS = signal(false);

  readonly rarityDisabledColors = rarityDisabledColors;

  @HostBinding() class = 'block';
  readonly size = input<number>(5);
  readonly card = input.required<CardState>();
  readonly isEnabled = input<boolean>(true);
  readonly isTargetSource = input<boolean>(false);
  readonly isTargetCandidate = input<boolean>(false);
  readonly usage = output();
  readonly highlight = output();
  readonly animateEnabled = computed(() => CardComponent.timerS());
}
