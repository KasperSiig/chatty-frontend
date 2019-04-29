import { Injectable } from '@angular/core';
import {Message} from '../models/Message';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {formatDate} from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private http: HttpClient) { }


  /**
   *Sets time and makes post request
   * @param message
   */
  send(message: Message): Observable<Message> {
    message.time = new Date().getTime();
    return this.http.post<any>(environment.apiUrl + '/message', message);
  }
}
