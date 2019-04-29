import {Injectable} from '@angular/core';
import {Message} from '../models/Message';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {AngularFirestore} from '@angular/fire/firestore';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private http: HttpClient,
              private db: AngularFirestore) {
  }


  /**
   *Sets time and makes post request
   * @param message
   */
  send(message: Message): Observable<Message> {
    message.time = new Date().getTime();
    return this.http.post<any>(environment.apiUrl + '/message', message);
  }

  /**
   * Recieve messages and sort by ascending time
   */
  recieve(): Observable<Message[]> {
    return this.db.collection<Message>('messages').valueChanges().
      pipe(
        map(messages => {
          return messages.sort((messagea, messageb) => {
            return messageb.time - messagea.time;
          });
        })
      );
  }
}
