import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import {  MatToolbarModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { environment } from '../../../environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { User } from '../models/User';
import { UserService } from '../services/user.service';
import { BehaviorSubject, of } from 'rxjs';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';


describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  let userSvcMock: any;

  beforeEach(async(() => {
    userSvcMock = jasmine.createSpyObj('UserService', ['getUserObs']);
    userSvcMock.getUserObs.and.returnValue(of(new User()));

    TestBed.configureTestingModule({
      imports: [
        MatToolbarModule,
        FlexLayoutModule,
        AngularFireStorageModule,
        AngularFirestoreModule,
        AngularFireModule.initializeApp(environment.config),
        HttpClientModule,
        HttpClientTestingModule
      ],
      declarations: [
        HeaderComponent
      ],
      providers: [
        { provide: UserService, useValue: userSvcMock }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
