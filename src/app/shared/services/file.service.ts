import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UserService} from './user.service';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private us: UserService,
              private http: HttpClient) {

  }

  uploadImage(file: File): Observable<any> {
    const uploadImage = new FormData();
    uploadImage.append('file', file);
    uploadImage.append('user', JSON.stringify(this.us.getUser()));
    return this.http.post<any>(environment.apiUrl + '/files', uploadImage);
  }
}
