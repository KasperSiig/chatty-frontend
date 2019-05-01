import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { first, flatMap, map, mapTo } from 'rxjs/operators';
import { Avatar } from '../models/Avatar';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private storage: AngularFireStorage,
              private db: AngularFirestore) {
  }

  /**
   * Get download url for all avatars, and then kill subscription
   */
  getAllAvatarsNames(): Observable<string[]> {
    return this.db.collection('avatars').valueChanges()
      .pipe(
        first(),
        map(avatars => {
          return avatars.map((avatar: Avatar) => avatar.fileName);
        })
      );
  }

  /**
   * Gets download url for avatar
   * @param fileName Name of avatar file
   */
  getAvatarDownloadURL(fileName: string) {
    return this.storage.ref('avatars/' + fileName).getDownloadURL();
  }

  /**
   * Saves username in localStorage
   * @param username String to save in localStorage
   */
  login(user: User) {
    localStorage.setItem('user', JSON.stringify(user));
  }
  
   /**
   * Gets the user currently logged in
   */
  getUser(): User {
    return JSON.parse(localStorage.getItem('user'));
  }
}
