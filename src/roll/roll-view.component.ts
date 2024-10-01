import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { IconComponent } from '../ui/icon.component';
import { NgForOf } from '@angular/common';
import {
  bounceAnimation,
  bounceInOnEnterAnimation,
  rotateAnimation,
  shakeAnimation,
} from 'angular-animations';
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
    bounceAnimation({ anchor: 'rollIdle', duration: 1000 }),
  ],
  template: `
    <div
      [style.margin-top]="'10rem'"
      [style.display]="'flex'"
      [style.justify-content]="'center'"
      [@rollIdle]="animateIdle"
      [@onClick]="animateRoll"
      (@rollIdle.done)="onIdleDone()"
      (@onClick.done)="onOnClickDone()"
      (click)="readyToRoll = true"
    >
      <app-icon name="rolling-dices" [size]="10" />
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
          <app-item [item]="item" [size]="5" />
        </div>
      }
    </div>
  `,
})
export class RollViewComponent {
  private readonly service = inject(CollectionManagementService);

  readonly randomItems = signal<(Item & Id)[]>([]);
  protected animateRoll = false;
  protected animateIdle = true;
  protected readyToRoll = false;

  onIdleDone() {
    if (this.readyToRoll) {
      this.animateRoll = !this.animateRoll;
    } else {
      this.animateIdle = !this.animateIdle;
    }
  }

  onOnClickDone() {
    if (!this.readyToRoll) return;
    this.readyToRoll = false;
    this.animateIdle = !this.animateIdle;
    const randomItems = this.service.rollNewItems(5);
    this.randomItems.set(randomItems);
    this.service.addItems(randomItems);
  }
}
