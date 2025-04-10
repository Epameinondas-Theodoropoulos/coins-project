import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./feature/coins-table/coins-table.component').then(
        (m) => m.CoinsTableComponent
      ),
  },
];
