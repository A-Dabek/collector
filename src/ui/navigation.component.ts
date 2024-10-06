import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IconComponent } from './icon.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [RouterLink, IconComponent],
  selector: 'app-navbar',
  template: `
    <div class="pure-menu pure-menu-horizontal" [style.text-align]="'center'">
      <ul class="pure-menu-list">
        <li class="pure-menu-item">
          <a routerLink="collection" class="pure-menu-link">
            <app-icon
              name="book-cover"
              [style.display]="'inline'"
              [size]="1.5"
            />
            Collection
          </a>
        </li>
        <li class="pure-menu-item">
          <a routerLink="roll" class="pure-menu-link">
            <app-icon
              name="rolling-dices"
              [style.display]="'inline'"
              [size]="1.5"
            />
            Roll
          </a>
        </li>
        <li class="pure-menu-item">
          <a routerLink="game" class="pure-menu-link">
            <app-icon
              name="rolling-dices"
              [style.display]="'inline'"
              [size]="1.5"
            />
            Start a run
          </a>
        </li>
      </ul>
    </div>
  `,
})
export class NavigationComponent {}
