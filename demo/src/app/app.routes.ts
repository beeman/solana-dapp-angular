import { Route } from '@angular/router';
import { UiLayoutComponent } from './ui/ui-layout.component';

const links: { label: string; path: string }[] = [
  { label: 'Account', path: '/account' },
  { label: 'Clusters', path: '/clusters' },
  { label: 'Counter Program', path: '/counter' },
];

const routes: Route[] = [
  {
    path: 'account/:address',
    loadComponent: () =>
      import('./account/account-detail-feature.component').then(
        (m) => m.AccountDetailFeatureComponent
      ),
  },
  {
    path: 'account',
    loadComponent: () =>
      import('./account/account-list-feature.component').then(
        (m) => m.AccountListFeatureComponent
      ),
  },
  {
    path: 'clusters',
    loadComponent: () =>
      import('./cluster/cluster-feature.component').then(
        (m) => m.ClusterFeatureComponent
      ),
  },
  {
    path: 'counter',
    loadComponent: () =>
      import('./counter/counter-feature.component').then(
        (m) => m.CounterFeatureComponent
      ),
  },
];
export const appRoutes: Route[] = [
  {
    path: '',
    component: UiLayoutComponent,
    data: { links },
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      ...routes,
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./dashboard/dashboard-feature.component').then(
            (m) => m.DashboardFeatureComponent
          ),
      },
    ],
  },
];
