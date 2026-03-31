import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.component').then((m) => m.LoginComponent)
  },
  {
    path: 'verificacion',
    loadComponent: () =>
      import('./pages/verificacion/verificacion.component').then((m) => m.VerificacionComponent)
  },
  { path: '**', redirectTo: 'login' }
];
