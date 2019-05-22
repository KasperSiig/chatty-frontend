import { TestBed } from '@angular/core/testing';

import { UserService } from './user.service';
import { AngularFirestore, AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorage, AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../../../environments/environment';
import { BehaviorSubject, of } from 'rxjs';
import { User } from '../models/User';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/auth';
import { CreateDTO } from '../models/dto/CreateDTO';

describe('UserService', () => {
  let angularFireStoreMock;
  let fsCollectionMock;
  let angularFireStorageMock;
  let refMock;
  let service: UserService;
  let afAuthMock: any;
  let httpMock: HttpTestingController;

  const userMock = {
    displayName: 'username',
    photoURL: 'https://example.com/avatar1.png'
  };

  beforeEach(() => {
    // Mock AngularFirestore
    angularFireStoreMock = jasmine.createSpyObj('AngularFireStore', ['collection']);
    fsCollectionMock = jasmine.createSpyObj('collection', ['valueChanges']);
    angularFireStoreMock.collection.and.returnValue(fsCollectionMock);
    fsCollectionMock.valueChanges.and.returnValue(of([{fileName: 'avatar1.png', type: 'image/png'}]));

    // Mock AngularFireStorage
    angularFireStorageMock = jasmine.createSpyObj('AngularFireStorage', ['ref']);
    refMock = jasmine.createSpyObj('ref', ['getDownloadURL']);
    angularFireStorageMock.ref.and.returnValue(refMock);
    refMock.getDownloadURL.and.returnValue(of('https://example.com/avatar1.png'));

    // Mock AngularFireAuth
    afAuthMock = {};
    afAuthMock.auth = jasmine.createSpyObj('auth',
      ['signInWithEmailAndPassword']);

    afAuthMock.auth.signInWithEmailAndPassword.and.returnValue(of([]).toPromise());

    TestBed.configureTestingModule({
      imports: [
        AngularFirestoreModule,
        AngularFireStorageModule,
        AngularFireModule.initializeApp(environment.config),
        AngularFireAuthModule,
        HttpClientTestingModule
      ],
      providers: [
        {provide: AngularFirestore, useValue: angularFireStoreMock},
        {provide: AngularFireStorage, useValue: angularFireStorageMock},
        {provide: AngularFireAuth, useValue: afAuthMock}
      ]
    });
    service = TestBed.get(UserService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('Avatars', () => {
    it('should get all avatar names', () => {
      service.getAllAvatarsNames().subscribe(name => {
        expect(name[0]).toBe('avatar1.png');
      }).unsubscribe();
    });

    it('should get avatar url', () => {
      service.getAvatarDownloadURL('avatar1.png').subscribe(url => {
        expect(url).toBe('https://example.com/avatar1.png');
      });
    });
  });

  describe('User', () => {
    it('should return as observable', () => {
      service.user = new BehaviorSubject<User>(new User());
      expect(service.getUserObs()).toBeTruthy();
    });

    it('should be logged in', () => {
      service.login('test@test.com', 'password');
      expect(afAuthMock.auth.signInWithEmailAndPassword).toHaveBeenCalledTimes(1);
    });

    it('should fetch user', () => {
      service.user = new BehaviorSubject<User>(new User());

      service.userCheck = function userCheck() {
        return new Promise<any>(resolve => resolve(userMock));
      };

      service.fetchUser().then(() => {
        const user = new User();
        user.userName = 'username';
        user.avatarUrl = 'https://example.com/avatar1.png';
        expect(service.user.value).toEqual(user);
      });
    });

    it('should fail to fetch user', () => {
      service.user = new BehaviorSubject<User>(new User());

      service.userCheck = function userCheck() {
        return new Promise<any>(resolve => resolve(null));
      };

      service.fetchUser().then(() => {
        const user = new User();
        user.userName = 'username';
        user.avatarUrl = 'https://example.com/avatar1.png';
        expect(service.user.value).toEqual(null);
      });
    });

    it('should create user', () => {
      const createDTO = new CreateDTO();
      createDTO.email = 'test@test.com';
      createDTO.userName = 'username';
      createDTO.password = 'password';
      createDTO.avatarURL = 'https://example.com/avatar1.png';

      service.create(createDTO).subscribe();

      const req = httpMock.expectOne(environment.apiUrl + '/users/create');

      expect(req.request.method).toEqual('POST');

      req.flush(createDTO);
    });

    it('should be updated', () => {
      service.user = new BehaviorSubject<User>({userName: 'username', avatarUrl: 'https://example.com/avatar1.png'});
      service.update('newUsername').then(() => {
        expect(service.user.getValue().userName).toEqual('newUsername');
      });
    });
  });
});
