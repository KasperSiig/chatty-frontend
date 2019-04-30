import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { first, flatMap, map, mapTo } from 'rxjs/operators';
import { Avatar } from '../models/Avatar';

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

  getAvatarDownloadURL(fileName: string) {
    return this.storage.ref('avatars' + fileName).getDownloadURL();
  }
}
