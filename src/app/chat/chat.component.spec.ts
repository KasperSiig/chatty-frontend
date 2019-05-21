import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ChatComponent } from './chat.component';
import { Helper } from '../../testing/helper';
import { HttpClientModule } from '@angular/common/http';
import { MessageService } from '../shared/services/message.service';
import { of } from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule, MatCardModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { SendComponent } from '../messages/send/send.component';
import { MessageComponent } from '../messages/message/message.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../../environments/environment';
import { Store } from '@ngxs/store';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { Component } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

describe('ChatComponent', () => {
  let component: ChatComponent;
  let fixture: ComponentFixture<ChatComponent>;

  let helper: Helper;
  let messageServiceMock: any;
  let storeMock: any;
  let routerMock;

  beforeEach(async(() => {
    messageServiceMock = jasmine.createSpyObj('MessageService', ['recieve']);
    messageServiceMock.recieve.and.returnValue(of([]));
    storeMock = jasmine.createSpyObj('Store', ['select']);
    storeMock.select.and.returnValue(of(['message']));

    routerMock = jasmine.createSpyObj('Router', ['navigate']);
    routerMock.navigate.and.returnValue('');

    TestBed.configureTestingModule({
      providers: [
        {provide: MessageService, useValue: messageServiceMock},
        {provide: Store, useValue: storeMock},
        {provide: Router, useValue: routerMock}
      ],
      imports: [
        BrowserAnimationsModule,
        FlexLayoutModule,
        MatButtonModule,
        MatInputModule,
        MatFormFieldModule,
        HttpClientModule,
        MatCardModule,
        ReactiveFormsModule,
        FormsModule,
        AngularFirestoreModule,
        AngularFireStorageModule,
        AngularFireModule.initializeApp(environment.config),
        AngularFireAuthModule,
        RouterTestingModule.withRoutes([]),
      ],
      declarations: [
        ChatComponent,
        SendComponent,
        MessageComponent
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatComponent);
    component = fixture.componentInstance;
    helper = new Helper();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show one message', () => {
    component.messages = helper.getMessages(1);
    fixture.detectChanges();
    expect(component.messages.length).toBe(1);
  });
});

@Component({
  template: ''
})
class DummyComponent {
}
