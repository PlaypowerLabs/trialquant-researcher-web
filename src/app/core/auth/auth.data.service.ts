import { Injectable } from '@angular/core';
import { Observable, from, throwError } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { auth } from 'firebase/app';
import { map, catchError, first } from 'rxjs/operators';

@Injectable()
export class AuthDataService {

  constructor(
    private fireAuth: AngularFireAuth,
    private firestore: AngularFirestore,
  ) { }

  loginWithEmail(email: string, password: string): Observable<any> {
    return from(this.loginWithEmailPromise(email, password)).pipe(
      map((result) => {
        return result;
      }),
      catchError((error) => {
        return throwError(error.message);
      })
    );
  }

  signUpWithEmail(fullName: string, email: string, password: string): Observable<any> {
    return from(this.signUpWithEmailPromise(fullName, email, password)).pipe(
      map((result) => {
        return result;
      }),
      catchError((error) => {
        return throwError(error.message);
      })
    );
  }

  logout(): Observable<void> {
    return from(this.fireAuth.signOut());
  }

  async loginWithEmailPromise(
    email: string,
    password: string
  ): Promise<any> {
    try {
      await this.fireAuth.setPersistence(auth.Auth.Persistence.LOCAL);
      // const userDoc = await this.firestore.collection('researchers', ref =>
      //   ref.where('email', '==', email)
      // ).get().toPromise();

      return await this.fireAuth.signInWithEmailAndPassword(email, password);
    } catch (e) {
      throw new Error(e);
    }
  }

  async signUpWithEmailPromise(
    fullName: string,
    email: string,
    password: string,
  ): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const userData = await this.fireAuth.createUserWithEmailAndPassword(email, password);
        const userDoc = {
          name: fullName,
          email,
          password
        };
        await this.firestore.collection('researchers').add(userDoc);
        resolve(userData);
      } catch (error) {
        reject(error);
      }
    });
  }

  checkAuthUserEntryInResearcherCollection(email: string) {
    return this.firestore.collection('researchers', ref => ref.where('email', '==', email))
      .get()
      .pipe(
        map(querySnapshot => {
          if (querySnapshot.docs.length === 0) {
            throw new Error('User entry not found in researchers collection');
          }
          return querySnapshot;
        }),
        catchError(error => throwError(error.message))
      );
  }
}
