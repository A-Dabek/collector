import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  input,
} from '@angular/core';
import { IconComponent } from './icon.component';
import { Id, Item } from '../services/collection-persistence.service';
import { NgIf } from '@angular/common';

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
    />
  `,
  imports: [IconComponent, NgIf],
})
export class ItemComponent {
  item = input<(Item & Id) | undefined>();

  private readonly rarityColors: { [key: string]: string } = {
    common: '#D3D3D3', // LighterLightGray
    uncommon: '#228B22', // DimDarkGreen
    rare: '#4169E1', // RoyalBlue
    epic: '#8A2BE2', // BlueViolet
    legendary: '#FFD700', // Gold
    mythic: '#DC143C', // Crimson Mythic Red
  };
  readonly rarities = Object.values(this.rarityColors);
}
