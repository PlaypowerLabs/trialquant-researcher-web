import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Study, Protocol } from './store/study.model';
import * as StudyActions from './store/study.actions';

@Injectable()
export class StudyDataService {

  constructor(
    private fireAuth: AngularFireAuth,
    private firestore: AngularFirestore,
  ) { }

  fetchProtocolsIds(researcherId: string) {
    const query = ref =>
      ref.where('createdBy', '==', researcherId);
    return this.firestore
      .collection('protocols', query)
      .snapshotChanges()
      .pipe(
        map(actions =>
          actions.map(action => {
            // const doc = action.payload.doc.data() as Protocol;
            const id = action.payload.doc.id;
            return id;
          })
        )
      );
  }

  fetchStudies(protocolIds: string[]) {
    const query = ref =>
      ref.where('protocolId', 'in', protocolIds);
    return this.firestore
      .collection('studies', query)
      .snapshotChanges()
      .pipe(
        map(actions =>
          actions.map(action => {
            const doc = action.payload.doc.data() as Study;
            const id = action.payload.doc.id;
            return { ...doc, id };
          })
        )
      );
  }
}
