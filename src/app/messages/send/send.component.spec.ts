import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SendComponent } from './send.component';
import {HttpClientModule} from '@angular/common/http';
import {DOMHelper} from '../../../testing/dom-helper';
import {Helper} from '../../../testing/helper';
import { of } from 'rxjs';
import { MessageService } from '../../shared/services/message.service';

describe('SendComponent', () => {
  let component: SendComponent;
  let fixture: ComponentFixture<SendComponent>;

  let dm: DOMHelper<SendComponent>;
  let helper: Helper;
  let messageServiceMock: any;

  beforeEach(async(() => {
    messageServiceMock = jasmine.createSpyObj('MessageService', ['send']);
    messageServiceMock.send.and.returnValue(of([]));
    TestBed.configureTestingModule({
      declarations: [ SendComponent ],
      imports: [
        HttpClientModule
      ],
      providers: [
        {provide: MessageService, useValue: messageServiceMock}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SendComponent);
    component = fixture.componentInstance;
    dm = new DOMHelper(fixture);
    helper = new Helper();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call send in component one time', () => {
    component.send('test message', 'test sender');
    fixture.detectChanges();
    expect(messageServiceMock.send).toHaveBeenCalledTimes(1);
  });

});


