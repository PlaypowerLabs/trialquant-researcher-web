import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { StudyProgress } from './store/studyProgress.model';

@Injectable()
export class StudyProgressDataService {

  constructor(
    private fireAuth: AngularFireAuth,
    private firestore: AngularFirestore,
  ) { }

  fetchStudyProgressByStudyId(studyId: string) {
    const query = ref =>
      ref.where('studyId', '==', studyId);
    return this.firestore
      .collection('studyProgress', query)
      .snapshotChanges()
      .pipe(
        map(actions =>
          actions.map(action => {
            const doc = action.payload.doc.data() as StudyProgress;
            const id = action.payload.doc.id;
            return { ...doc, id };
          })
        )
      );
  }

}
