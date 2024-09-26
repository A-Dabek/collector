import {Component, ChangeDetectionStrategy} from '@angular/core';

@Component({
  selector: 'app-collection-view',
  standalone: true,
  template: `
    <div>
      Collection
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CollectionViewComponent {
}
