import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let localStorageMock: any;
  let service: AuthService;
  beforeEach(() => {

    localStorageMock = {
      getItem: (key: string): string => {
        return '{"username": "username"}';
      }
    };

    spyOn(localStorage, 'getItem').and.callFake(localStorageMock.getItem);

    TestBed.configureTestingModule({
      providers: [
        {provide: localStorage, useValue: localStorageMock}
      ]
    });

    service = TestBed.get(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return that user is logged in', () => {
    expect(service.isLoggedIn()).toBeTruthy();
  });
});
