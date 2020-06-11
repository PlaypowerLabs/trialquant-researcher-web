import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { studyReducer } from './store/studyProgress.reducer';
import { StudyProgressEffects } from './store/studyProgress.effects';
import { StudyProgressDataService } from './studyProgress.data.service';
import { StudyProgressService } from './studyProgress.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    EffectsModule.forFeature([StudyProgressEffects]),
    StoreModule.forFeature('studyProgress', studyReducer)
  ],
  providers: [
    StudyProgressDataService,
    StudyProgressService
  ]
})
export class StudyProgressModule { }
