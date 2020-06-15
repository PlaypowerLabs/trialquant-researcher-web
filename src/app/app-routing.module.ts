import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {
  AngularFireAuthGuard,
  redirectUnauthorizedTo,
  redirectLoggedInTo
} from '@angular/fire/auth-guard';
import { AuthGuard } from './core/auth/auth.guard';
import { NegateAuthGuard } from './core/auth/negate.auth.guard';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['auth']);
const redirectLoggedInToDashboard = () => redirectLoggedInTo(['dashboard']);

const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    loadChildren: () => import('./modules/auth/auth.module').then((m) => m.AuthModule),
    canActivate: [NegateAuthGuard],
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./modules/dashboard/dashboard.module').then((m) => m.DashboardModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'study/:studyId',
    loadChildren: () => import('./modules/study/study.module').then((m) => m.StudyModule),
    canActivate: [AuthGuard],
  },
  { path: '**', redirectTo: 'auth', pathMatch: 'full' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
})
export class AppRoutingModule { }
