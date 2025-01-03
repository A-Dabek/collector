import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-game-description',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="flex flex-col items-center justify-center">
      <h1 class="text-2xl font-bold text-white">{{ name() }}</h1>
      <p class="text-gray-300">{{ description() }}</p>
    </div>
  `,
})
export class GameDescriptionComponent {
  readonly name = input<string>();
  readonly description = input<string>();
}
