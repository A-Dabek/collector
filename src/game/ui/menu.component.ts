import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { IconComponent } from '../../ui/icon.component';

@Component({
  selector: 'app-game-menu',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IconComponent],
  animations: [],
  template: `
    <div class="flex mb-2">
      <div class="flex items-center space-x-2" (click)="restart.emit()">
        <app-icon name="cycle" [style.display]="'inline'" [size]="1.5" />
        <span>Give up</span>
      </div>
      <div class="ms-1 text-amber-500">
        {{
          lastUiAction() ? 'Playing ' + (lastUiAction() || '...') : 'Your turn'
        }}
      </div>
    </div>
  `,
})
export class GameMenuComponent {
  readonly lastUiAction = input<string>();
  readonly restart = output();
}
