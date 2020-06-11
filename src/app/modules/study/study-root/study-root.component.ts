import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { StudyService } from 'src/app/core/study/study.service';
import { StudyProgressService } from 'src/app/core/studyProgress/studyProgress.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-study-root',
  templateUrl: './study-root.component.html',
  styleUrls: ['./study-root.component.less']
})
export class StudyRootComponent implements OnInit, OnDestroy {

  sub: Subscription;
  constructor(
    public router: Router,
    public studyService: StudyService,
    public studyProgressService: StudyProgressService,
  ) { }

  studyProgress$ = this.studyProgressService.allStudiesProgress$;
  sessionIndexArray$ = this.studyProgressService.sessionIndexArray$;
  selectedStudyDoc$ = this.studyService.selectedStudyDoc$;

  ngOnInit(): void {
    this.sub = this.studyProgress$.subscribe(data => {
      console.log('Study Progress :', data);
    });
  }

  navigateToHomepage() {
    this.router.navigate(['dashboard']);
  }

  objectValues(dataObject: any) {
    return Object.values(dataObject);
  }

  exportCSV() {

  }

  exportStudyProtocol() {

  }

  ngOnDestroy() {
    this.studyService.setSelectedStudyId(null);
    this.studyProgressService.clearStudyProgressState();
  }
}
