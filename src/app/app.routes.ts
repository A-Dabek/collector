import {Routes} from '@angular/router';

export const routes: Routes = [
  {
    path: 'collection',
    loadComponent: () => import('../collection/collection-view.component').then(m => m.CollectionViewComponent)
  },
  {
    path: 'roll',
    loadComponent: () => import('../roll/roll-view.component').then(m => m.RollViewComponent)
  }
];
