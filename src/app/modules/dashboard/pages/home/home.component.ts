import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/core/auth/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Subscription, Observable } from 'rxjs';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.less'],
})
export class HomeComponent implements OnInit, OnDestroy {
  studies$: Observable<any[]>;

	constructor(
    private authService: AuthService,
    private auth: AngularFireAuth,
    private afs: AngularFirestore
  ) {}

	ngOnInit(): void {
    this.auth.user.subscribe(user => {
      if (user) {
        const uid = user.uid;
        this.studies$ = this.afs.collection('studies', ref => ref.where('created_by', '==', uid)).valueChanges();
      } 
    });

    // this.studies$.subscribe(data => {
    //   console.log(data);
    // });
  }

  ngOnDestroy(): void {

  }

	logout(): void {
		this.authService.logout();
	}
}
