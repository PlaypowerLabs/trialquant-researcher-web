import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './pages/login/login.component';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
	declarations: [LoginComponent],
	imports: [
		CommonModule,
		AuthRoutingModule,
		FormsModule,
		ReactiveFormsModule,
		NzGridModule,
		NzFormModule,
		NzInputModule,
    NzButtonModule,
    NzTypographyModule
	],
})
export class AuthModule {}
