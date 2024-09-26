import {ChangeDetectionStrategy, Component} from '@angular/core';
import {RouterLink} from "@angular/router";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    RouterLink
  ],
  selector: 'app-navbar',
  template: `
    <div class="pure-menu pure-menu-horizontal">
      <ul class="pure-menu-list">
        <li class="pure-menu-item"><a routerLink="collection" class="pure-menu-link">Collection</a></li>
        <li class="pure-menu-item"><a routerLink="roll" class="pure-menu-link">Roll</a></li>
      </ul>
    </div>
  `,
})
export class NavigationComponent {

}
