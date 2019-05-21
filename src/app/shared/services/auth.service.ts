import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: AngularFireAuth) { }

  /**
   * Checks if user is logged in
   */
  isLoggedIn(): boolean {
<<<<<<< HEAD
    console.log(this.auth);
=======
    console.log(this.auth.auth.currentUser);
>>>>>>> a1462b0a66298277ad9e6326b7d591c10f05fa8a
    return !!this.auth.auth.currentUser;
  }
}
