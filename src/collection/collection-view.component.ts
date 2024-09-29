import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CollectionManagementService } from '../services/collection-management.service';
import { AsyncPipe } from '@angular/common';
import { ItemComponent } from '../ui/item.component';
import { fadeInOnEnterAnimation } from 'angular-animations';

@Component({
  selector: 'app-collection-view',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AsyncPipe, ItemComponent],
  animations: [fadeInOnEnterAnimation({ duration: 250, anchor: 'itemEnter' })],
  template: `
    <div class="pure-g">
      @for (item of items$ | async; track item.id; let index = $index) {
        <div class="pure-u-1-5">
          <app-item
            [@itemEnter]="{ value: '', params: { delay: index * 100 } }"
            [item]="item"
          />
        </div>
      }
    </div>
  `,
})
export class CollectionViewComponent {
  private readonly service = inject(CollectionManagementService);

  items$ = this.service.collection$;
}
