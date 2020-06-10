import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { studyReducer } from './store/study.reducer';
import { StudyEffects } from './store/study.effects';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    EffectsModule.forFeature([StudyEffects]),
    StoreModule.forFeature('study', studyReducer)
  ],
  providers: [

  ]
})
export class StudyModule { }
