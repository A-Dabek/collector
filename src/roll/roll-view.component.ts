import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { IconComponent } from '../ui/icon.component';
import { NgForOf } from '@angular/common';
import { bounceInOnEnterAnimation, rotateAnimation } from 'angular-animations';
import { CollectionManagementService } from '../services/collection-management.service';
import { Id, Item } from '../services/collection-persistence.service';
import { ItemComponent } from '../ui/item.component';

@Component({
  selector: 'app-roll-view',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IconComponent, NgForOf, ItemComponent],
  animations: [
    bounceInOnEnterAnimation({
      anchor: 'rolledItemIn',
      delay: 0,
      duration: 750,
    }),
    rotateAnimation({ anchor: 'onClick', duration: 500, degrees: 360 }),
  ],
  template: `
    <div
      [@onClick]="animate"
      [style.display]="'flex'"
      [style.justify-content]="'center'"
    >
      <app-icon
        name="rolling-dices"
        [size]="10"
        (click)="chooseRandomItems()"
      />
    </div>
    <div class="pure-g">
      @for (item of randomItems(); track item.id; let index = $index) {
        <div
          class="pure-u-1-5"
          [@rolledItemIn]="{
            value: '',
            params: {
              delay: 500 + index * 500,
              duration: 750 + item.rarity * 250,
            },
          }"
        >
          <app-item [item]="item" />
        </div>
      }
    </div>
  `,
})
export class RollViewComponent {
  private readonly service = inject(CollectionManagementService);

  protected animate = false;
  readonly randomItems = signal<(Item & Id)[]>([]);

  chooseRandomItems(): void {
    this.animate = !this.animate;
    const randomItems = this.service.rollNewItems(5);
    this.randomItems.set(randomItems);
    this.service.addItems(randomItems);
  }
}
