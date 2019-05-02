import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ChatComponent } from './chat.component';
import { DOMHelper } from '../../testing/dom-helper';
import { Helper } from '../../testing/helper';
import { HttpClientModule } from '@angular/common/http';
import { MessageService } from '../shared/services/message.service';
import { of } from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule, MatCardModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { SendComponent } from '../messages/send/send.component';
import { MessageComponent } from '../messages/message/message.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

describe('ChatComponent', () => {
  let component: ChatComponent;
  let fixture: ComponentFixture<ChatComponent>;

  let dm: DOMHelper<ChatComponent>;
  let helper: Helper;
  let messageServiceMock: any;

  beforeEach(async(() => {
    messageServiceMock = jasmine.createSpyObj('MessageService', ['recieve']);
    messageServiceMock.recieve.and.returnValue(of([]));
    TestBed.configureTestingModule({
      providers: [
        {provide: MessageService, useValue: messageServiceMock}
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
        FormsModule
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
    dm = new DOMHelper(fixture);
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
