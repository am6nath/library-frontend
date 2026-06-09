import { Routes } from '@angular/router';
import { authGuard } from './guards/auth-guard';
import { loginGuard } from './guards/login-guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },

  {
    path: 'login',
    canActivate: [loginGuard],
    loadComponent: () =>
      import('./components/login/login').then(
        (m) => m.LoginComponent
      ),
  },

  {
    path: 'register',
    canActivate: [loginGuard],
    loadComponent: () =>
      import('./components/register/register').then(
        (m) => m.RegisterComponent
      ),
  },

  {
    path: 'home',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./components/home/home').then(
        (m) => m.Home
      ),
  },

  {
    path: 'add-book',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./components/add-book/add-book').then(
        (m) => m.AddBook
      ),
  },

  {
    path: 'edit-book/:id',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./components/edit-book/edit-book').then(
        (m) => m.EditBook
      ),
  },

  {
    path: '**',
    redirectTo: 'login',
  },
];