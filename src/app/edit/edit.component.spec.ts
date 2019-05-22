import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditComponent } from './edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../shared/modules/material.module';
import { FirebaseModule } from '../shared/modules/firebase.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { UserService } from '../shared/services/user.service';
import { of } from 'rxjs';
import { User } from '../shared/models/User';

describe('EditComponent', () => {
  let component: EditComponent;
  let fixture: ComponentFixture<EditComponent>;
  let userSvcMock: any;

  beforeEach(async(() => {
    userSvcMock = jasmine.createSpyObj('UserService', ['update', 'getUserObs', 'delete']);
    userSvcMock.update.and.returnValue('');
    userSvcMock.delete.and.returnValue(of('').toPromise());
    userSvcMock.getUserObs.and.returnValue(of(new User()));

    TestBed.configureTestingModule({
      declarations: [
        EditComponent
      ],
      imports: [
        ReactiveFormsModule,
        MaterialModule,
        FirebaseModule,
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [
        {provide: UserService, useValue: userSvcMock}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update user', () => {
    component.usernameForm.patchValue({username: 'username'});
    component.onSubmit();
    expect(userSvcMock.update).toHaveBeenCalled();
  });

  it('should delete user', () => {
    component.onDelete();
    expect(userSvcMock.delete).toHaveBeenCalled();
  });
});
