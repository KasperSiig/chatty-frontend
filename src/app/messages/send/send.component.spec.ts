import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SendComponent } from './send.component';
import { HttpClientModule } from '@angular/common/http';
import { Helper } from '../../../testing/helper';
import { of } from 'rxjs';
import { MessageService } from '../../shared/services/message.service';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule, MatFormFieldModule, MatInputModule, } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../../../environments/environment';
import { FileService } from '../../shared/services/file.service';
import { Store } from '@ngxs/store';

describe('SendComponent', () => {
  let component: SendComponent;
  let fixture: ComponentFixture<SendComponent>;

  let helper: Helper;
  let messageServiceMock: any;
  let fileServiceMock: any;
  let storeMock: any;

  beforeEach(async(() => {
    fileServiceMock = jasmine.createSpyObj('FileService', ['uploadImage', 'getBase64']);
    fileServiceMock.uploadImage.and.returnValue(of([]));
    fileServiceMock.getBase64.and.returnValue(of([]).toPromise());

    messageServiceMock = jasmine.createSpyObj('MessageService', ['send']);
    messageServiceMock.send.and.returnValue(of([]));

    storeMock = jasmine.createSpyObj('Store', ['dispatch']);
    storeMock.dispatch.and.returnValue(of([]));

    TestBed.configureTestingModule({
      providers: [
        {provide: MessageService, useValue: messageServiceMock},
        {provide: FileService, useValue: fileServiceMock},
        {provide: Store, useValue: storeMock}
      ],
      imports: [
        BrowserAnimationsModule,
        FlexLayoutModule,
        MatButtonModule,
        MatInputModule,
        MatFormFieldModule,
        HttpClientModule,
        ReactiveFormsModule,
        FormsModule,
        AngularFirestoreModule,
        AngularFireStorageModule,
        AngularFireModule.initializeApp(environment.config)
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
    helper = new Helper();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call send in component one time', () => {
    component.messageForm.get('message').setValue('test');
    component.send();
    fixture.detectChanges();
    expect(storeMock.dispatch).toHaveBeenCalledTimes(1);
  });

  it('isDisabled should be false if input contains value', () => {
    component.messageForm.get('message').setValue('test');
    component.isMessage();
    fixture.detectChanges();
    expect(component.isDisabled).toBeFalsy();
  });

  it('isDisabled should be true if input doesnt contains value', () => {
    component.messageForm.get('message');
    component.isMessage();
    fixture.detectChanges();
    expect(component.isDisabled).toBeTruthy();
  });
});


