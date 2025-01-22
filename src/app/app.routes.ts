import { Routes } from '@angular/router';
import {authGuard} from './services/auth/auth.guard';
import {BankComponent} from './modules/bank/bank.component';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./modules/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'home', loadComponent: () => import('./shareds/modules/home/home.component').then(m => m.HomeComponent),
    canActivate: [authGuard],
    children: [
      {
        path: 'dashboard',
        loadComponent: () => import('./modules/dashboard/dashboard.component').then(m => m.DashboardComponent),
      },
      {
        path: 'bank',
        loadComponent: () => import('./modules/bank/bank.component').then(m => m.BankComponent),
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '/home',
  },
];
