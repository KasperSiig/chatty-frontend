import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatComponent } from './chat.component';
import { DOMHelper } from '../../testing/dom-helper';
import { Helper } from '../../testing/helper';

describe('ChatComponent', () => {
  let component: ChatComponent;
  let fixture: ComponentFixture<ChatComponent>;

  let dm: DOMHelper<ChatComponent>;
  let helper: Helper;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ChatComponent]
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
