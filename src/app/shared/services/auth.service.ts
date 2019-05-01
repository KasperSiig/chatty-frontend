import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  /**
   * Checks if user is logged in
   */
  isLoggedIn(): boolean {
    console.log(localStorage);
    return !!JSON.parse(localStorage.getItem('user'));
  }
}
