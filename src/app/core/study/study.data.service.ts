import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable()
export class StudyDataService {

  constructor(
    private fireAuth: AngularFireAuth,
    private firestore: AngularFirestore,
  ) { }
}
