import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { first, flatMap, map, mapTo } from 'rxjs/operators';
import { Avatar } from '../models/Avatar';
import { User } from '../models/User';
import { UserDTO } from '../models/dto/UserDTO';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public user = new BehaviorSubject<User>(this.getUser());

  constructor(private storage: AngularFireStorage,
              private db: AngularFirestore,
              private http: HttpClient) {
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
  login(userDTO: UserDTO): Observable<any> {
    return this.http.post(environment.apiUrl + '/login', userDTO);
  }

  /**
   * Gets the user currently logged in
   */
  getUser(): User {
    return JSON.parse(localStorage.getItem('user'));
  }

  /**
   * Gets the user in form of an observable
   */
  getUserObs(): Observable<User> {
    return this.user;
  }

  /**
   *
   * @param userDTO
   */
  createUser(userDTO: UserDTO): Observable<any> {
    return this.http.post(environment.apiUrl + '/create', userDTO);
  }

  /**
   * Saves the JWT token to localstorage
   * @param JWT token
   */
  saveToken(token: string) {
    localStorage.setItem('jwt', JSON.stringify(token));
  }
}
