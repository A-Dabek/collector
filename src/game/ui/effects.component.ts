import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import {
  fadeInRightOnEnterAnimation,
  fadeOutLeftOnLeaveAnimation,
} from 'angular-animations';
import { EffectState } from '../effects/effect';
import { EffectComponent } from './effect.component';

@Component({
  selector: 'app-game-effects',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    fadeInRightOnEnterAnimation({
      anchor: 'enter',
      duration: 500,
    }),
    fadeOutLeftOnLeaveAnimation({
      anchor: 'leave',
      duration: 500,
    }),
  ],
  template: `
    <div class="flex flex-row space-x-1">
      <label>Effects</label>
      @for (effect of effects(); track effect.id) {
        <app-card-effect
          [card]="effect"
          [size]="2"
          (click)="highlight.emit(effect)"
          [@enter]
          [@leave]
        />
      }
    </div>
  `,
  imports: [EffectComponent, EffectComponent],
})
export class GameEffectsComponent {
  readonly effects = input.required<EffectState[]>();
  readonly highlight = output<EffectState>();
}
