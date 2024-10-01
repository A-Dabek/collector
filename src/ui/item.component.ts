import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  input,
} from '@angular/core';
import { IconComponent } from './icon.component';
import { Id, Item } from '../services/collection-persistence.service';
import { NgIf } from '@angular/common';
import { rarities } from './rarity';

@Component({
  selector: 'app-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  template: `
    <style>
      :host {
        display: block;
      }
    </style>
    <app-icon
      *ngIf="item() as item"
      [name]="item.id"
      [fill]="rarities[item.rarity || 0]"
      [size]="size()"
    />
  `,
  imports: [IconComponent, NgIf],
})
export class ItemComponent {
  readonly item = input<(Item & Id) | undefined>();
  readonly size = input(1);
  readonly rarities = rarities;
}
