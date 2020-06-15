import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudyRoutingModule } from './study-routing.module';
import { StudyRootComponent } from './study-root/study-root.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    StudyRootComponent
  ],
  imports: [
    CommonModule,
    StudyRoutingModule,
    SharedModule,
  ]
})
export class StudyModule { }
