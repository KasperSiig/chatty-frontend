import { TestBed } from '@angular/core/testing';

import { MessageService } from './message.service';
import {HttpClientModule} from '@angular/common/http';
import { BehaviorSubject, of } from 'rxjs';
import { AngularFirestore, AngularFirestoreModule } from '@angular/fire/firestore';
import { Helper } from '../../../testing/helper';
import { Test } from "tslint";
import { Message } from "../models/Message";

describe('MessageService', () => {
  let fsCollectionMock: any;
  let angularFirestoreMock: any;
  let helper: Helper;
  let service: MessageService;
  beforeEach(() => {
    angularFirestoreMock = jasmine.createSpyObj('AngularFirestore', ['collection']);
    fsCollectionMock = jasmine.createSpyObj('collection', ['valueChanges']);
    angularFirestoreMock.collection.and.returnValue(fsCollectionMock);
    fsCollectionMock.valueChanges.and.returnValue(of([]));
    service = jasmine.createSpyObj('MessageService', ['send', 'recieve']);
    TestBed.configureTestingModule({

      imports: [
        AngularFirestoreModule,
        HttpClientModule,
      ],
      providers: [
        {provide: AngularFirestore, useValue: angularFirestoreMock}
      ]
    });
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call send one time', () => {
    helper = new Helper();
    const message = helper.getMessages(1);
    service.send(message[0]);
    expect(service.send).toHaveBeenCalledTimes(1);
  });

  it('should get one message', () => {
    const s: MessageService = TestBed.get(MessageService);
    s.recieve();
    expect(angularFirestoreMock.collection).toHaveBeenCalledTimes(1);
  });
});
