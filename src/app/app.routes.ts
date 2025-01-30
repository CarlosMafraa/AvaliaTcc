import { Routes } from '@angular/router';
import {authGuard} from './services/auth/auth.guard';

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
        data: {
          perfis: ['aluno']
        }
      },
      {
        path: 'advisor',
        loadComponent: () => import('./modules/advisor/advisor.component').then(m => m.AdvisorComponent),
        data: {
          perfis: ['professor']
        }
      },
      {
        path: 'bank',
        loadComponent: () => import('./modules/bank/bank.component').then(m => m.BankComponent),
        data: {
          perfis: ['professor']
        }
      },
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
