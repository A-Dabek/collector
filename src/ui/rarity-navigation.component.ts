import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IconComponent } from './icon.component';
import { rarities, rarityColors } from './rarity';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [RouterLink, IconComponent],
  selector: 'app-rarity-navbar',
  template: `
    <div class="pure-menu pure-menu-horizontal text-center">
      <ul class="pure-menu-list flex justify-center space-x-4">
        @for (entry of rarityEntries; track entry[0]; let index = $index) {
          <li class="pure-menu-item">
            <a [routerLink]="'../' + index" class="pure-menu-link">
              <app-icon
                name="book-cover"
                [fill]="entry[1]"
                class="inline-block"
                [size]="1.5"
              />
            </a>
          </li>
        }
      </ul>
    </div>
  `,
})
export class NavigationComponent {
  readonly rarityEntries = Object.entries(rarityColors);
}
