import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'game',
    loadComponent: () =>
      import('../game/game-view.component').then((m) => m.GameViewComponent),
  },
  {
    path: '**',
    redirectTo: 'game',
    pathMatch: 'full',
  },
];
