import { Injectable } from '@angular/core';
import {Message} from '../models/Message';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private http: HttpClient) { }

  send(message: Message): Observable<Message> {
    message.time = Date.prototype.getTime();
    return this.http.post<any>(environment.apiUrl + '/message', message);
  }
}
