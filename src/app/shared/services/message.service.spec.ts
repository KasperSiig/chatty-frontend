import { getTestBed, TestBed } from '@angular/core/testing';
import { MessageService } from './message.service';
import { HttpClientModule } from '@angular/common/http';
import { of } from 'rxjs';
import { AngularFirestore, AngularFirestoreModule } from '@angular/fire/firestore';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from '../../../environments/environment';
import { User } from '../models/User';
import { UserService } from './user.service';

describe('MessageService', () => {
  let fsCollectionMock: any;
  let angularFirestoreMock: any;
  let service: MessageService;
  let httpMock: HttpTestingController;
  let userSvcMock: any;

  beforeEach(() => {
    // Mock AngularFirestore
    angularFirestoreMock = jasmine.createSpyObj('AngularFirestore', ['collection']);
    fsCollectionMock = jasmine.createSpyObj('collection', ['valueChanges']);
    angularFirestoreMock.collection.and.returnValue(fsCollectionMock);
    fsCollectionMock.valueChanges.and.returnValue(of([]));

    // Mock UserService
    userSvcMock = jasmine.createSpyObj('UserService', ['getUser']);
    userSvcMock.getUser.and.returnValue(new User());

    TestBed.configureTestingModule({

      imports: [
        AngularFirestoreModule,
        HttpClientModule,
        HttpClientTestingModule,
      ],
      providers: [
        {provide: AngularFirestore, useValue: angularFirestoreMock},
        {provide: UserService, useValue: userSvcMock}
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
    const mockMessage = 'message';

    service.send(mockMessage).subscribe();
    const req = httpMock.expectOne(environment.apiUrl + '/message');

    expect(req.request.method).toEqual('POST');

    req.flush(mockMessage);
  });
});
