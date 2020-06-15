import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { studyReducer } from './store/study.reducer';
import { StudyEffects } from './store/study.effects';
import { StudyDataService } from './study.data.service';
import { StudyService } from './study.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    EffectsModule.forFeature([StudyEffects]),
    StoreModule.forFeature('study', studyReducer)
  ],
  providers: [
    StudyDataService,
    StudyService
  ]
})
export class StudyModule { }
