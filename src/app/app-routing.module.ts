import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{ path: '', redirectTo: 'auth', pathMatch: 'full' },
	{ path: 'auth', loadChildren: () => import('./modules/auth/auth.module').then((m) => m.AuthModule) },
	{
		path: 'dashboard',
		loadChildren: () => import('./modules/dashboard/dashboard.module').then((m) => m.DashboardModule),
	},
	{ path: 'study', loadChildren: () => import('./modules/study/study.module').then((m) => m.StudyModule) },
	{ path: '**', redirectTo: 'auth', pathMatch: 'full' },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
