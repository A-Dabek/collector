import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'collection/:rarity',
    loadComponent: () =>
      import('../collection/collection-view.component').then(
        (m) => m.CollectionViewComponent,
      ),
  },
  {
    path: 'roll',
    loadComponent: () =>
      import('../roll/roll-view.component').then((m) => m.RollViewComponent),
  },
  {
    path: 'game',
    loadComponent: () =>
      import('../game/game-view.component').then((m) => m.GameViewComponent),
  },
  {
    path: '**',
    redirectTo: 'collection/0',
    pathMatch: 'full',
  },
];
