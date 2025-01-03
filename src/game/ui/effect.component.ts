import { NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  input,
  output,
} from '@angular/core';
import { IconComponent } from '../../ui/icon.component';
import { EffectState } from '../effects/effect';

@Component({
  selector: 'app-card-effect',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IconComponent, NgIf],
  template: `
    <div class="text-center">
      <app-icon
        class="cursor-pointer"
        [name]="card().name"
        [rarity]="card().rarity"
        [size]="size()"
      />
    </div>
  `,
})
export class EffectComponent {
  @HostBinding() class = 'block';
  readonly size = input<number>(5);
  readonly card = input.required<EffectState>();
  readonly highlight = output();
}
