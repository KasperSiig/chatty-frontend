import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { first, map, mapTo } from 'rxjs/operators';

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
  getAllAvatars(): Observable<any[]> {
    return this.db.collection('avatars').valueChanges()
      .pipe(
        first(),
        map(avatars => {
          // Gets all the file names
          const names = avatars.map(avatar => {
            return avatar.fileName;
          });

          // Gets all the urls
          const urls = [];
          names.map(name => {
            this.storage.ref('avatars/' + name).getDownloadURL().toPromise()
              .then(url => urls.push(url));
          });

          // Returns all the urls
          return urls;
        })
      );
  }
}
