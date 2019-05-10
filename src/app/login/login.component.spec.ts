import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { MatFormFieldModule, MatIconModule, MatInputModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { UserService } from '../shared/services/user.service';
import { Helper } from '../../testing/helper';
import { DOMHelper } from '../../testing/dom-helper';
import {Router} from '@angular/router';
import {Component} from '@angular/core';
import {RouterTestingModule} from '@angular/router/testing';
import {LoggedInGuard} from '../shared/guards/logged-in.guard';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  let userServiceMock: any;
  let helper: Helper;
  let dm: DOMHelper<LoginComponent>;
  let routerMock;
  beforeEach(async(() => {
    userServiceMock = jasmine.createSpyObj('UserService', ['login', 'getAllAvatarsNames', 'getAvatarDownloadURL', 'createUser']);
    userServiceMock.createUser.and.returnValue(of([]));
    userServiceMock.login.and.returnValue(of([]));
    userServiceMock.getAllAvatarsNames.and.returnValue(of([]));
    userServiceMock.getAvatarDownloadURL.and.returnValue(of([]));
    routerMock = jasmine.createSpyObj('Router', ['navigate']);
    routerMock.navigate.and.returnValue('');
    TestBed.configureTestingModule({
      declarations: [
        LoginComponent,
        DummyComponent
      ],
      imports: [
        MatFormFieldModule,
        FlexLayoutModule,
        MatInputModule,
        MatIconModule,
        BrowserAnimationsModule,
        RouterTestingModule.withRoutes([
            {path: '', component: DummyComponent, canActivate: [LoggedInGuard]},
            {path: 'login', component: DummyComponent}
        ])
      ],
      providers: [
        {provide: UserService, useValue: userServiceMock},
        {provide: Router, useValue: routerMock}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    helper = new Helper();
    dm = new DOMHelper(fixture);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('should send user to service', () => {
  //  component.onSubmit('testname', 'testpass');
  //  expect(userServiceMock.createUser).toHaveBeenCalledTimes(1);
  // });
});

@Component({
  template: ''
})
class DummyComponent {
}

