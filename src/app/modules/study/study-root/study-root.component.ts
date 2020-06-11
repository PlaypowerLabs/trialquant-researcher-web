import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { StudyService } from 'src/app/core/study/study.service';
import { StudyProgressService } from 'src/app/core/studyProgress/studyProgress.service';

@Component({
  selector: 'app-study-root',
  templateUrl: './study-root.component.html',
  styleUrls: ['./study-root.component.less']
})
export class StudyRootComponent implements OnInit, OnDestroy {

  constructor(
    public router: Router,
    public studyService: StudyService,
    public studyProgressService: StudyProgressService,
  ) { }

  ngOnInit(): void {
  }

  navigateToHomepage() {
    this.router.navigate(['dashboard']);
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
