import { NgModule, SkipSelf, Optional } from '@angular/core';
import { CommonModule } from '@angular/common';
import { environment } from './../../environments/environment';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './core.state';
import { StoreRouterConnectingModule, RouterStateSerializer } from '@ngrx/router-store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { CustomSerializer } from './router/custom-serializer';
import { AuthModule } from './auth/auth.module';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAnalyticsModule } from '@angular/fire/analytics';
import { StudyModule } from './study/study.module';
import { StudyProgressModule } from './studyProgress/studyProgress.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAnalyticsModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    StoreRouterConnectingModule.forRoot(),
    EffectsModule.forRoot([]),
    environment.production
      ? []
      : StoreDevtoolsModule.instrument({
        name: 'NeuroUX',
      }),
    AuthModule,
    StudyModule,
    StudyProgressModule,
  ],
  providers: [{
    provide: RouterStateSerializer,
    useClass: CustomSerializer
  }],
})
export class CoreModule {
  constructor(
    @Optional()
    @SkipSelf()
    parentModule: CoreModule
  ) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import only in AppModule');
    }
  }
}
