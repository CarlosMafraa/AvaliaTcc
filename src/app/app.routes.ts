import { Routes } from '@angular/router';
import {authGuard} from './services/auth/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./modules/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'home', loadComponent: () => import('./shareds/modules/home/home.component').then(m => m.HomeComponent),
    // canActivate: [authGuard],
    children: [
      // {
      //   path: 'dashboard',
      //   loadComponent: () => import('./modules/dashboard/dashboard.component').then(m => m.DashboardComponent),
      // },
      // {
      //   path: '',
      //   redirectTo: 'dashboard',
      //   pathMatch: 'full'
      // }
    ]
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '/login',
  },
];
