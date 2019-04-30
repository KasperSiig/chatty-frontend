import {getTestBed, TestBed} from '@angular/core/testing';

import { MessageService } from './message.service';
import {HttpClientModule} from '@angular/common/http';
import { BehaviorSubject, of } from 'rxjs';
import { AngularFirestore, AngularFirestoreModule } from '@angular/fire/firestore';
import { Helper } from '../../../testing/helper';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {environment} from '../../../environments/environment';

describe('MessageService', () => {
  let fsCollectionMock: any;
  let angularFirestoreMock: any;
  let helper: Helper;
  let service: MessageService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    angularFirestoreMock = jasmine.createSpyObj('AngularFirestore', ['collection']);
    fsCollectionMock = jasmine.createSpyObj('collection', ['valueChanges']);
    angularFirestoreMock.collection.and.returnValue(fsCollectionMock);
    fsCollectionMock.valueChanges.and.returnValue(of([]));
    TestBed.configureTestingModule({

      imports: [
        AngularFirestoreModule,
        HttpClientModule,
        HttpClientTestingModule,
      ],
      providers: [
        {provide: AngularFirestore, useValue: angularFirestoreMock}
      ]
    });
    httpMock = getTestBed().get(HttpTestingController);
    service = TestBed.get(MessageService);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get one message', () => {
    service.recieve().subscribe();
    expect(angularFirestoreMock.collection).toHaveBeenCalledTimes(1);
  });

  it('Returned Observable should match data', () => {
    const mockMessage = {
      content: 'Test message',
      sender: 'Test Person',
      time: 4567890
    };

    service.send(mockMessage).subscribe();
    const req = httpMock.expectOne(environment.apiUrl + '/message');

    expect(req.request.method).toEqual('POST');

    req.flush(mockMessage);
  });
});
