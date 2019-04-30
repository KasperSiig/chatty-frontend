import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SendComponent } from './send.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatButtonModule, MatFormFieldModule, MatInputModule,} from '@angular/material';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HttpClientModule} from '@angular/common/http';
import {MessageComponent} from '../message/message.component';

describe('SendComponent', () => {
  let component: SendComponent;
  let fixture: ComponentFixture<SendComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        FlexLayoutModule,
        MatButtonModule,
        MatInputModule,
        MatFormFieldModule,
        HttpClientModule
      ],
      declarations: [
        SendComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
