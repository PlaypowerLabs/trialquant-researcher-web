import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { map, switchMap, catchError } from 'rxjs/operators';
import { of, Observable, from, throwError } from 'rxjs';
import { Study, Protocol } from './store/study.model';
import * as StudyActions from './store/study.actions';
import { fetch } from 'node-fetch';

@Injectable()
export class StudyDataService {

  constructor(
    private fireAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private storage: AngularFireStorage,
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

  getProtocolCSVDownloadURL(protocolCSVRef: string) {
    const pathRef = this.storage.ref(protocolCSVRef);
    return pathRef.getDownloadURL();
  }

  getProtocolDocByID(protocolId: string) {
    return this.firestore.collection('protocols').doc(protocolId).get();
  }

  downloadStudyTrialLogsCSV(studyId: string) {
    const downloadTrailLogsPromise = fetch(
      'https://us-central1-ppl-trialquant.cloudfunctions.net/exportTrialLogs',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({
          studyId
        })
      });
    return from(downloadTrailLogsPromise).pipe(
      catchError((error) => {
        return throwError(error.message);
      })
    );
  }

  downloadFromURL(url: string) {
    const downloadTrailLogsPromise = fetch(
      url,
      {
        method: 'GET',
        headers: {
          'Access-Control-Allow-Origin': '*'
        },
      }).then;
    return from(downloadTrailLogsPromise).pipe(
      catchError((error) => {
        return throwError(error.message);
      })
    );
  }
}
