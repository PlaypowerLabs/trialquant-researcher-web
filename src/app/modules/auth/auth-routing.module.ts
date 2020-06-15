import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthRootComponent } from './auth-root/auth-root.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';

const routes: Routes = [
  {
    path: '',
    component: AuthRootComponent,
    children: [
      {
        path: 'sign-in',
        component: SignInComponent
      },
      {
        path: 'sign-up',
        component: SignUpComponent
      },
      {
        path: '**',
        redirectTo: 'sign-in'
      }
    ]
  },
  {
    path: '**',
    redirectTo: ''
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ],
})
export class AuthRoutingModule { }
