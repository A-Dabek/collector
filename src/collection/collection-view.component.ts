import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
import { CollectionManagementService } from '../services/collection-management.service';
import { AsyncPipe } from '@angular/common';
import { ItemComponent } from '../ui/item.component';
import { fadeInOnEnterAnimation } from 'angular-animations';
import { NavigationComponent } from '../ui/rarity-navigation.component';

@Component({
  selector: 'app-collection-view',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AsyncPipe, ItemComponent, NavigationComponent],
  animations: [fadeInOnEnterAnimation({ duration: 250, anchor: 'itemEnter' })],
  template: `
    <app-rarity-navbar />
    <div class="pure-g">
      @for (item of items$ | async; track item.id; let index = $index) {
        <div class="pure-u-1-5">
          <app-item
            [@itemEnter]="{ value: '', params: { delay: index * 50 } }"
            [item]="item"
            [size]="3"
          />
        </div>
      }
    </div>
  `,
})
export class CollectionViewComponent {
  private readonly service = inject(CollectionManagementService);
  private readonly route = inject(ActivatedRoute);

  readonly rarity$ = this.route.paramMap.pipe(
    map((params) => params.get('rarity')),
  );

  readonly items$ = this.service.collection$;
}
