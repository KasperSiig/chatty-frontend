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
    console.log(this.auth.auth.currentUser);
    return !!this.auth.auth.currentUser;
  }
}
