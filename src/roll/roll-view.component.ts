import {Component, ChangeDetectionStrategy} from '@angular/core';

@Component({
  selector: 'app-roll-view',
  standalone: true,
  template: `
    <div>
      Roll
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RollViewComponent {
}
