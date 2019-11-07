import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { User } from './User';


@Injectable({
  providedIn: 'root'
})


export class AuthService {
  user: Observable<User>;
  errors: string;
  constructor(private afAuth: AngularFireAuth, private afs: AngularFirestore, private router: Router, public ngZone: NgZone) {
    this.user = this.afAuth.authState
      .pipe(
        switchMap(
          user => {
            return !!user ? this.afs.doc<User>(`users/${user.uid}`).valueChanges() : of(null);
          })
      );
    this.errors = '';
  }
  googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    return this.oAuthLogin(provider);
  }
  facebookLogin() {
    const provider = new firebase.auth.FacebookAuthProvider();
    return this.oAuthLogin(provider);
  }
  githubLogin() {
    const provider = new firebase.auth.GithubAuthProvider();
    return this.oAuthLogin(provider);
  }
  twitterLogin() {
    const provider = new firebase.auth.TwitterAuthProvider();
    return this.oAuthLogin(provider);
  }
  AnonymousLogin() {
    const provider = new firebase.auth.EmailAuthProvider();
    return this.oAuthLogin(provider);
  }
  sendVerificationEmail() {
    return this.afAuth.auth.currentUser.sendEmailVerification()
  }
  signUp(email, password) {
   this.afAuth.auth.createUserWithEmailAndPassword(email, password).then(
      (result) => {
        this.updateUserData(result.user);
       // console.log(result.user);
        //this.sendVerificationEmail();
        this.router.navigate(['/home']);
      }).catch((error) => {
        console.log(error);
      });
  }
  signIn(email,password) {
    this.afAuth.auth.signInWithEmailAndPassword(email, password).then(
      (result) => {
        
        this.updateUserData(result.user);
        this.ngZone.run(()=>{
          this.router.navigate(['/home']);
        });
        this.errors = '';
      
      }).catch((error) => {
        this.errors = error.message;
      });
    return this.errors;
  }
  private oAuthLogin(provider) {
    this.afAuth.auth.signInWithPopup(provider)
      .then((credential) => {
        this.updateUserData(credential.user);
        this.ngZone.run(()=>{
          this.router.navigate(['/home']);
        })
        
        //console.log(credential.user);
       // this.router.navigate(['/home']);
        // console.log(localStorage.set(''));
      });
  }
  signOut() {
    this.afAuth.auth.signOut().then(
      () => {
       
        this.router.navigate(['/']);
      }
    );
  }

  get currentUserObservable(): string{
    return this.afAuth.auth.currentUser.uid;
  }
  uid(): string{
    return this.afAuth.auth.currentUser.uid;
  }
  private updateUserData(user) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const data: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL
    };
    return userRef.set(data, { merge: true });
  }
}

