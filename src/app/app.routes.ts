import { Routes } from '@angular/router';

export const appRoutes: Routes = [
  {
    path: 'devices',
    loadComponent: () =>
      import('./pages/devices/device-list/device-list.component').then(
        (m) => m.DeviceListComponent
      ),
  },
  {
    path: 'categories',
    loadComponent: () =>
      import('./pages/categories/category-list/category-list.component').then(
        (m) => m.CategoryListComponent
      ),
  },
  { path: '', redirectTo: '/devices', pathMatch: 'full' },
];
