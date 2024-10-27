import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ProgressBarComponent } from './progress-bar.component';

@Component({
  selector: 'app-game-bars',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ProgressBarComponent],
  template: `
    <app-bar
      class="mb-2"
      [current]="points()"
      [max]="maxPoints()"
      styleClass="bg-yellow-400"
    />
    <app-bar [current]="health()" [max]="maxHealth()" styleClass="bg-red-300" />
  `,
})
export class GameBarsComponent {
  readonly points = input.required<number>();
  readonly maxPoints = input.required<number>();
  readonly health = input.required<number>();
  readonly maxHealth = input.required<number>();
}
