import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IconComponent } from './icon.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [RouterLink, IconComponent],
  selector: 'app-navbar',
  template: `
    <div class="text-center">
      <ul class="flex space-x-4">
        <li>
          <a routerLink="collection" class="flex items-center space-x-2">
            <app-icon
              name="book-cover"
              [style.display]="'inline'"
              [size]="1.5"
            />
            <span>Collection</span>
          </a>
        </li>
        <li>
          <a routerLink="roll" class="flex items-center space-x-2">
            <app-icon
              name="rolling-dices"
              [style.display]="'inline'"
              [size]="1.5"
            />
            <span>Roll</span>
          </a>
        </li>
        <li>
          <a routerLink="game" class="flex items-center space-x-2">
            <app-icon
              name="rolling-dices"
              [style.display]="'inline'"
              [size]="1.5"
            />
            <span>Start a run</span>
          </a>
        </li>
      </ul>
    </div>
  `,
})
export class NavigationComponent {}
