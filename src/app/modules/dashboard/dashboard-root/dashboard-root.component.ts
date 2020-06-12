import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';

import { AuthService } from 'src/app/core/auth/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { StudyService } from 'src/app/core/study/study.service';

@Component({
  selector: 'app-dashboard-root',
  templateUrl: './dashboard-root.component.html',
  styleUrls: ['./dashboard-root.component.less']
})
export class DashboardRootComponent implements OnInit, OnDestroy {

  constructor(
    private authService: AuthService,
    public studyService: StudyService,
    private router: Router,
  ) { }

  currentUser$ = this.authService.currentUser$;
  allStudies$ = this.studyService.allStudies$;
  isLoadingStudies$ = this.studyService.isLoadingStudies$;

  ngOnInit() {
  }

  navigateToStudyPage(studyId: string) {
    this.router.navigate(['study', studyId]);
  }

  ngOnDestroy(): void {
  }

  logout(): void {
    this.authService.logout();
  }
}
