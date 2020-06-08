import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { SharedModule } from './../../shared/shared.module';
import { AuthRootComponent } from './auth-root/auth-root.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';

@NgModule({
  declarations: [
    AuthRootComponent,
    SignInComponent,
    SignUpComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedModule
  ],
})
export class AuthModule { }
