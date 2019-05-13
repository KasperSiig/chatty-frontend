import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { first, flatMap, map, mapTo } from 'rxjs/operators';
import { Avatar } from '../models/Avatar';
import { User } from '../models/User';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { CreateDTO } from '../models/dto/CreateDTO';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private storage: AngularFireStorage,
              private db: AngularFirestore,
              private http: HttpClient,
              private auth: AngularFireAuth) {
  }

  public user = new BehaviorSubject<User>(null);

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
   * Logs User in with Firebase Auth
   * @param email Email for User
   * @param password Password for User
   */
  async login(email: string, password: string) {
    console.log(typeof this.auth.auth);
    await this.auth.auth.signInWithEmailAndPassword(email, password);
    this.fetchUser();
  }

  /**
   * Gets the user currently logged in
   */
  getUser() {
    return this.user.getValue();
  }

  /**
   * Fetches user and sends it to BehaviorSubject
   */
  async fetchUser() {
    const userCheck = await this.userCheck() as {displayName: string, photoURL: string};
    if (userCheck === undefined || userCheck === null) {
      this.user.next(null);
      return;
    }

    const user = new User();
    user.userName = userCheck.displayName;
    user.avatarUrl = userCheck.photoURL;
    this.user.next(user);
  }

  /**
   * Returns promise containing user on init
   */
  userCheck() {
    return new Promise(resolve => {
      this.auth.auth.onAuthStateChanged(user => {
        resolve(user);
      });
    });
  }

  /**
   * Gets the user in form of an observable
   */
  getUserObs(): Observable<User> {
    return this.user;
  }

  /**
   * Creates User
   * @param createDTO User to be created
   */
  create(createDTO: CreateDTO): Observable<any> {
    return this.http.post(environment.apiUrl + '/users/create', createDTO);
  }
}

