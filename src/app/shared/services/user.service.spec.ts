import { TestBed } from '@angular/core/testing';

import { UserService } from './user.service';
import { AngularFirestore, AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorage, AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../../../environments/environment';
import { of } from 'rxjs';

describe('UserService', () => {
  let angularFireStoreMock;
  let fsCollectionMock;
  let angularFireStorageMock;
  let refMock;
  let service: UserService;
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

    TestBed.configureTestingModule({
      imports: [
        AngularFirestoreModule,
        AngularFireStorageModule,
        AngularFireModule.initializeApp(environment.config)
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
});
