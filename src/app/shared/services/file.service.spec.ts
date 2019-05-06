import { getTestBed, TestBed } from '@angular/core/testing';

import { FileService } from './file.service';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorage, AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../../../environments/environment';

describe('FileService', () => {

  let refMock;
  let angularFireStorageMock;
  let service: FileService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    // Mock AngularFireStorage
    angularFireStorageMock = jasmine.createSpyObj('AngularFireStorage', ['ref']);
    refMock = jasmine.createSpyObj('ref', ['getDownloadURL']);
    angularFireStorageMock.ref.and.returnValue(refMock);
    refMock.getDownloadURL.and.returnValue(of('https://example.com/avatar1.png'));

    TestBed.configureTestingModule({

      imports: [
        HttpClientModule,
        HttpClientTestingModule,
        AngularFirestoreModule,
        AngularFireStorageModule,
        AngularFireModule.initializeApp(environment.config)
      ],
      providers: [
        {provide: AngularFireStorage, useValue: angularFireStorageMock}
      ]
    });
    httpMock = getTestBed().get(HttpTestingController);
    service = TestBed.get(FileService);
  });

  afterEach(() => {
    httpMock.verify();
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
