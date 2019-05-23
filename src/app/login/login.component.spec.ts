import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { MatFormFieldModule, MatIconModule, MatInputModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { UserService } from '../shared/services/user.service';
import { Helper } from '../../testing/helper';
import {Router} from '@angular/router';
import {Component} from '@angular/core';
import {RouterTestingModule} from '@angular/router/testing';
import {LoggedInGuard} from '../shared/guards/logged-in.guard';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../../environments/environment';
import { CreateDTO } from '../shared/models/dto/CreateDTO';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  let userServiceMock: any;
  let helper: Helper;
  let routerMock;
  beforeEach(async(() => {
    userServiceMock = jasmine.createSpyObj('UserService', ['login', 'getAllAvatarsNames', 'getAvatarDownloadURL', 'create']);
    userServiceMock.login.and.returnValue(of([]).toPromise());
    userServiceMock.getAllAvatarsNames.and.returnValue(of(['https://example.com/avatar1.png']));
    userServiceMock.getAvatarDownloadURL.and.returnValue(of([]));
    userServiceMock.create.and.returnValue(of([]));

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
        ReactiveFormsModule,
        AngularFireAuthModule,
        AngularFireModule.initializeApp(environment.config),
        RouterTestingModule.withRoutes([
          {path: 'chat', component: DummyComponent}
        ])
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
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get avatar URLs', () => {
    expect(userServiceMock.getAvatarDownloadURL).toHaveBeenCalledTimes(1);
  });

  it('should log user in', () => {
    component.onLoginSubmit();
    expect(userServiceMock.login).toHaveBeenCalledTimes(1);
  });

  it('should invalidate on password mismatch', () => {
    component.createForm.patchValue({
      password1: 'password1',
      password2: 'password2'
    });
    component.onCreateSubmit();
    expect(userServiceMock.create).toHaveBeenCalledTimes(0);
    expect(component.onCreateSubmit()).toBe('User was not created');
  });

  it('should create CreateDTO object', () => {
    component.imgUrls = ['https://example.com/avatar1.png'];
    component.createForm.patchValue({
      password1: 'password',
      password2: 'password',
      email: 'test@test.com',
      username: 'username',
      avatarURL: 'https://example.com/avatar1.png'
    });

    const form = component.createForm;
    const createDTO = new CreateDTO();
    createDTO.email = form.get('email').value;
    createDTO.userName = form.get('username').value;
    createDTO.password = form.get('password1').value;
    createDTO.avatarURL = 'https://example.com/avatar1.png';
    expect(component.onCreateSubmit()).toEqual(createDTO);
  });
});

@Component({
  template: ''
})
class DummyComponent {
}
