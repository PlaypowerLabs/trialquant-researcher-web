import { NgModule, SkipSelf, Optional } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as firebase from 'firebase/app';
import 'firebase/analytics';
import { environment } from './../../environments/environment';

@NgModule({
	declarations: [],
	imports: [CommonModule],
})
export class CoreModule {
	constructor(
		@Optional()
		@SkipSelf()
		parentModule: CoreModule
	) {
		if (parentModule) {
			throw new Error('CoreModule is already loaded. Import only in AppModule');
		} else {
			firebase.initializeApp(environment.firebaseConfig);
			firebase.analytics();
		}
	}
}
