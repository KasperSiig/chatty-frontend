import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { MatFormFieldModule, MatInputModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { UserService } from '../shared/services/user.service';
import { Helper } from '../../testing/helper';
import { DOMHelper } from '../../testing/dom-helper';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  let userServiceMock: any;
  let helper: Helper;
  let dm: DOMHelper<LoginComponent>;
  beforeEach(async(() => {
    userServiceMock = jasmine.createSpyObj('UserService', ['login', 'getAllAvatarsNames', 'getAvatarDownloadURL']);
    userServiceMock.login.and.returnValue(of([]));
    userServiceMock.getAllAvatarsNames.and.returnValue(of([]));
    userServiceMock.getAvatarDownloadURL.and.returnValue(of([]));
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [
        MatFormFieldModule,
        FlexLayoutModule,
        MatInputModule,
        BrowserAnimationsModule
      ],
      providers: [
        {provide: UserService, useValue: userServiceMock}
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

  it('should send user to service', () => {
    const user = helper.getUsers(1);
    component.onSubmit(user[0].userName);
    expect(userServiceMock.login).toHaveBeenCalledTimes(1);
  });
});

