import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SendComponent } from './send.component';
import {HttpClientModule} from '@angular/common/http';
import {DOMHelper} from '../../../testing/dom-helper';
import {Helper} from '../../../testing/helper';

describe('SendComponent', () => {
  let component: SendComponent;
  let fixture: ComponentFixture<SendComponent>;

  let dm: DOMHelper<SendComponent>;
  let helper: Helper;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SendComponent ],
      imports: [
        HttpClientModule
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

});


