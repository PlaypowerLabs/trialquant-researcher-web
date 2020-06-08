import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthDataService {
  constructor(private fireAuth: AngularFireAuth) { }

  loginWithEmail(email: string, password: string): Observable<any> {
    return from(this.loginWithEmailPromise(email, password)).pipe(
      map((result) => {
        return result;
      })
    );
  }

  logout(): Observable<void> {
    return from(this.fireAuth.signOut());
  }

  async loginWithEmailPromise(email: string, password: string): Promise<any> {
    try {
      await this.fireAuth.setPersistence(auth.Auth.Persistence.LOCAL);
      return await this.fireAuth.signInWithEmailAndPassword(email, password);
    } catch (e) {
      throw new Error(e);
    }
  }
}
