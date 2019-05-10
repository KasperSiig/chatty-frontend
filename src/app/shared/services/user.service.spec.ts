import { TestBed } from '@angular/core/testing';

import { UserService } from './user.service';
import { AngularFirestore, AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorage, AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../../../environments/environment';
import { BehaviorSubject, of } from 'rxjs';
import { User } from '../models/User';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';

describe('UserService', () => {
  let angularFireStoreMock;
  let fsCollectionMock;
  let angularFireStorageMock;
  let refMock;
  let service: UserService;
  let localStorageMock;
  let store;
  let userMock;
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

    store = {};
    localStorageMock = {
      getItem: (key: string): string => {
        return store[key];
      },
      setItem: (key: string, value: string) => {
        store[key] = value;
      }
    };

    spyOn(localStorage, 'getItem').and.callFake(localStorageMock.getItem);
    spyOn(localStorage, 'setItem').and.callFake(localStorageMock.setItem);

    userMock = new User();
    userMock.userName = 'username';
    userMock.avatarUrl = 'https://example.com/avatar1.png';
    localStorageMock.setItem('user', JSON.stringify(userMock));

    TestBed.configureTestingModule({
      imports: [
        AngularFirestoreModule,
        AngularFireStorageModule,
        AngularFireModule.initializeApp(environment.config),
        HttpClientModule,
        HttpClientTestingModule
      ],
      providers: [
        {provide: AngularFirestore, useValue: angularFireStoreMock},
        {provide: AngularFireStorage, useValue: angularFireStorageMock}
      ]
    });
    service = TestBed.get(UserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
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
    it('should be logged in', () => {
      const userMock = {
        userName: 'username',
        avatarUrl: 'https://example.com/avatar1.png'
      };
      service.login(userMock);
      expect(localStorageMock.getItem('user')).toBe(JSON.stringify(userMock));
    });

    it('should get logged in user', () => {
      localStorageMock.setItem('user', JSON.stringify(userMock));
      const user = service.getUser();
      expect(user.avatarUrl).toBe(userMock.avatarUrl);
      expect(user.userName).toBe(userMock.userName);
    });

    it('should return as observable', () => {
      service.user = new BehaviorSubject<User>(new User());
      expect(service.getUserObs()).toBeTruthy();
    });
  });
});
