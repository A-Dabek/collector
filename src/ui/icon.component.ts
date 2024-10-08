import {
  Component,
  ChangeDetectionStrategy,
  input,
  computed,
} from '@angular/core';
import iconCollection from '../../assets/result.json';

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
      <path d="M0 0h512v512H0z" [attr.fill]="backgroundFill()" />
      <path [attr.fill]="fill()" [attr.d]="shape()" />
    </svg>
  `,
})
export class IconComponent {
  readonly fill = input('#ffffff');
  readonly backgroundFill = input('#000000');
  readonly name = input('');
  readonly size = input(1);
  readonly shape = computed(() => (iconCollection as any)[this.name()] || '');
}
