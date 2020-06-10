import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';

import { AuthService } from 'src/app/core/auth/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-root',
  templateUrl: './dashboard-root.component.html',
  styleUrls: ['./dashboard-root.component.less']
})
export class DashboardRootComponent implements OnInit, OnDestroy {

  studies$: Observable<any[]>;
  userSub: Subscription;

  constructor(
    private authService: AuthService,
    private auth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router,
  ) { }

  currentUser$ = this.authService.currentUser$;

  ngOnInit(): void {
    this.userSub = this.auth.user.subscribe(user => {
      if (user) {
        const uid = user.uid;
        // this.studies$ = this.afs.collection('studies', ref => ref.where('created_by', '==', uid)).valueChanges();
        this.studies$ = this.afs.collection('studies').valueChanges();
      }
    });

    // this.studies$.subscribe(data => {
    //   console.log(data);
    // });
  }

  navigateToStudyPage(studyId: string) {
    this.router.navigate(['study', studyId]);
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

  logout(): void {
    this.authService.logout();
  }

}
