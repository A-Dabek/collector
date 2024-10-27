import {
  ChangeDetectionStrategy,
  Component,
  input,
  OnInit,
  output,
} from '@angular/core';
import { IconComponent } from '../../ui/icon.component';
import { UiAction } from '../actions/ui-actions';

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
        <span>Restart</span>
      </div>
      <div class="ms-1 text-amber-500">
        {{
          lastUiAction()
            ? 'Playing ' + (lastUiAction()?.constructor?.name || '...')
            : 'Your turn'
        }}
      </div>
    </div>
  `,
})
export class GameMenuComponent {
  readonly lastUiAction = input<UiAction>();
  readonly restart = output();
}
