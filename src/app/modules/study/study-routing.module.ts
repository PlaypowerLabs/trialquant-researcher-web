import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StudyRootComponent } from './study-root/study-root.component';

const routes: Routes = [
  {
    path: '',
    component: StudyRootComponent,
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class StudyRoutingModule { }
