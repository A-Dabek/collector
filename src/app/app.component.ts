import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { IconComponent } from '../ui/icon.component';
import { NavigationComponent } from '../ui/navigation.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, IconComponent, NavigationComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <nav>
      <app-navbar />
    </nav>
    <main class="pt-3 px-1">
      <router-outlet />
    </main>
  `,
})
export class AppComponent {}
