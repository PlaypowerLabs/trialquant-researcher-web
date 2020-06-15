import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { map, switchMap, catchError } from 'rxjs/operators';
import { of, Observable, from, throwError } from 'rxjs';
import { Study, Protocol } from './store/study.model';
import * as StudyActions from './store/study.actions';
import { fetch } from 'node-fetch';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class StudyDataService {

  constructor(
    private fireAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private http: HttpClient,
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
    const exportTrialLogsURL = 'https://us-central1-ppl-trialquant.cloudfunctions.net/exportTrialLogs';
    // TODO: Update this later
    const body = {
      participantId: '1266'
    };
    const headerOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Accept: 'text/csv'
      }),
      responseType: 'blob' as 'json'
    };
    return this.http.post<Blob>(exportTrialLogsURL, JSON.stringify(body), headerOption);
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
