 import { Injectable,NgZone } from '@angular/core';
 import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat/app';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import {User} from '../../interfaces/user'
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData : any;
  userDataSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  isLogout!:boolean;
  constructor(private auth: AngularFireAuth,private router : Router, private afStore: AngularFirestore, public ngZone: NgZone){
    this.auth.authState.subscribe((user: any) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        this.userDataSubject.next(this.userData);
        this.isLogout = true;
      } else {
        localStorage.setItem('user', 'null');
        this.userData = null; // Optional: Clear the userData
        this.userDataSubject.next(this.userData);
        this.isLogout = false;
      }
    });
    
    // this.auth.authState.subscribe((user:any) =>{
    //   if(user){
    //     this.userData = user;
    //     localStorage.setItem('user', JSON.stringify(this.userData));
    //     JSON.parse(localStorage.getItem('user')!)
    //     this.isLogout = true;
    //   }
    //   else{
    //     localStorage.setItem('user', 'null');
    //     JSON.parse(localStorage.getItem('user')!);
    //     this.isLogout = false;
    //   }
    // })
  //   onAuthStateChanged(this.auth2,(user: any)=>{
  //     if(user){
  //       this.userData = user;
  //       localStorage.setItem('user', JSON.stringify(this.userData));
  //       JSON.parse(localStorage.getItem('user')!);
  //     } else {
  //       localStorage.setItem('user', 'null');
  //       JSON.parse(localStorage.getItem('user')!);
  //     }
  //   })
   }

  //get User
    //get Authenticated user from firebase
    getAuthFire(){
      let userInfo; 
      this.auth.authState.subscribe((user: any) => {
        userInfo = user;
      });
  
      return userInfo
    }


    //get Authenticated user from Local Storage
    getAuthLocal(){
      const token = localStorage.getItem('user')
      const user = JSON.parse(token as string);
      return user;
    }

     // Email/Password Signup
  signUpWithEmail(email: string, password: string) {
    return this.auth.createUserWithEmailAndPassword(email, password)
    .then((result)=>{
      // this.snedVerificationMail()
      // this.SetUserData(result.user)
      this.router.navigate(['']);
    })
    .catch((error)=>{
      // window.alert(error.message)
      console.log(error)
    })
  }

  // Email/Password Login
  loginWithEmail(email: string, password: string) {
    return this.auth.signInWithEmailAndPassword(email, password)
    .then((result) =>{
      // this.SetUserData(result.user);
      this.auth.authState.subscribe((user)=>{
        if(user){
          this.router.navigate(['']);
        }
      })
    })
    .catch((error)=>{
      // window.alert(error.message);
      console.log(error)
    })
  }

  // Google Login
  loginWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    return this.auth.signInWithPopup(provider);
  }


 updateUserProfile(name: any) {
    // Get the current user
        // return this.auth.updateCurrentUser(profile);
        this.auth.authState.subscribe((user: any) => {
          if (user) {
            const userInfo = {
              displayName: name,
              photoURL: "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png",
              email:user?.multiFactor?.user?.email,
              uid:user?.multiFactor?.user?.uid
            }
            this.userData = userInfo;
            this.userDataSubject.next(this.userData);
          }})
        
     
       
    }

  // SetUserData(user: any) {
  //   const userRef: AngularFirestoreDocument<any> = this.afStore.doc(
  //     `users/${user.uid}`
  //   );
  //   const userData: User = {
  //     uid: user.uid,
  //     email: user.email,
  //     name: user.name,
  //     photoURL: user.photoURL,
  //     // emailVerified: user.emailVerified,
  //   };
  //   return userData;
  // }
  
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user !== null;
    // && user.emailVerified !== false ? true : false;
  }

  // Logout
  logout() {
    return this.auth.signOut()
    .then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['account/login']);
      
    })
    ;
  }
    
}
