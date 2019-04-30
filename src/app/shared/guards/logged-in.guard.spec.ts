import { TestBed, inject, fakeAsync } from '@angular/core/testing';
import { LoggedInGuard } from './logged-in.guard';
import { AuthService } from '../services/auth.service';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { Component } from '@angular/core';

describe('LoggedInGuard', () => {
  let authServiceMock: any;
  let guard: LoggedInGuard;
  let mockSnapshot: any;
  let routerMock;

  beforeEach(() => {
    authServiceMock = jasmine.createSpyObj('AuthService', ['isLoggedIn']);
    authServiceMock.isLoggedIn.and.returnValue(false);
    mockSnapshot = jasmine.createSpyObj('RouterStateSnapshot', ['toString']);
    routerMock = jasmine.createSpyObj('Router', ['navigateByUrl']);
    routerMock.navigateByUrl.and.returnValue('');

    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([
          {path: '', component: DummyComponent, canActivate: [LoggedInGuard]},
          {path: 'login', component: DummyComponent}
        ])
      ],
      providers: [
        LoggedInGuard,
        {provide: AuthService, useValue: authServiceMock},
        {provide: Router, useValue: routerMock}
      ],
      declarations: [
        DummyComponent
      ]
    });
    guard = TestBed.get(LoggedInGuard);
  });

  it('should create', inject([LoggedInGuard], (guard: LoggedInGuard) => {
    expect(guard).toBeTruthy();
  }));

  it('should not authenticate', () => {
    expect(guard.canActivate(new ActivatedRouteSnapshot(), mockSnapshot)).toEqual(false);
  });

  it('should route to login', fakeAsync(() => {
    guard.canActivate(new ActivatedRouteSnapshot(), mockSnapshot);
    expect(routerMock.navigateByUrl).toHaveBeenCalled();
  }));
});

@Component({
  template: ''
})
class DummyComponent {
}
