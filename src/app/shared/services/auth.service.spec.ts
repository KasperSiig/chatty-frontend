import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../../../environments/environment';
import { of } from 'rxjs';

describe('AuthService', () => {
  let service: AuthService;
  let afAuthMock: any;

  beforeEach(() => {
    afAuthMock = jasmine.createSpyObj('AngularFireAuth', ['authState']);
    afAuthMock.auth = {currentUser: true};
    afAuthMock.auth.signInWithEmailAndPassword.and.returnValue(of('').toPromise());

    TestBed.configureTestingModule({
      imports: [
        AngularFireAuthModule,
        AngularFireModule.initializeApp(environment.config)
      ],
      providers: [
        {provide: AngularFireAuth, useValue: afAuthMock}
      ]
    });

    service = TestBed.get(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should log user in', () => {
    expect(service.isLoggedIn()).toBeTruthy();
  });
});
