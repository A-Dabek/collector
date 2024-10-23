import {
  Component,
  ChangeDetectionStrategy,
  input,
  computed,
} from '@angular/core';
import iconCollection from '../../assets/result.json';
import { Rarity, rarityColors } from './rarity';

@Component({
  selector: 'app-icon',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  template: `
    <style>
      :host {
        display: inline-block;
      }
    </style>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      [style.width]="size() + 'rem'"
      [style.height]="size() + 'rem'"
    >
      <path
        [attr.filter]="'url(#' + rarity() + ')'"
        [attr.fill]="fill()"
        [attr.d]="shape()"
      />
    </svg>
  `,
})
export class IconComponent {
  readonly color = input('');
  readonly name = input('');
  readonly size = input(1);
  readonly rarity = input<Rarity>('common');

  readonly shape = computed(() => (iconCollection as any)[this.name()] || '');
  readonly fill = computed(() => this.color() || rarityColors[this.rarity()]);
}
