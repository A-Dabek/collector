import { NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  input,
  output,
} from '@angular/core';
import { headShakeAnimation } from 'angular-animations';
import { IconComponent } from '../../ui/icon.component';
import { Card } from '../library/access';

@Component({
  selector: 'app-card',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IconComponent, NgIf],
  animations: [headShakeAnimation({ anchor: 'usage', duration: 500 })],
  template: `
    <div *ngIf="card() as card" class="text-center">
      <div>{{ card.name }}</div>
      <app-icon
        class="cursor-pointer"
        [@usage]="{ value: animate, params: {} }"
        [name]="card.name"
        [rarity]="card.rarity"
        [size]="card.enabled ? 5 : 3"
        (click)="onUsage()"
      />
      <div>{{ card.description }}</div>
    </div>
  `,
})
export class CardComponent {
  @HostBinding() class = 'block';
  readonly card = input<Card>();
  readonly usage = output();
  animate = false;

  onUsage() {
    this.animate = !this.animate;
    this.usage.emit();
  }
}
