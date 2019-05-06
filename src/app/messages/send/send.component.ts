import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MessageService } from '../../shared/services/message.service';
import { FormControl, FormGroup } from '@angular/forms';
import {FileService} from '../../shared/services/file.service';

@Component({
  selector: 'app-send',
  templateUrl: './send.component.html',
  styleUrls: ['./send.component.scss']
})
export class SendComponent implements OnInit {

  messageForm = new FormGroup({
    message: new FormControl('')
  });

  isDisabled = true;

  @ViewChild('input') input: ElementRef;

  constructor(private messageService: MessageService,
              private fs: FileService) {
  }

  ngOnInit() {
  }

  /**
   * Sends message content and name of sender to MessageService
   * @param message Content of message to be sent
   */
  send() {
    this.messageService.send(this.messageForm.get('message').value).subscribe();
    this.input.nativeElement.value = '';
    this.isMessage();
  }

  /**
   * Checks if input field has a value
   */
  isMessage() {
    this.isDisabled =
      this.messageForm.get('message').value == null ||
      this.messageForm.get('message').value === '' ||
      this.input.nativeElement.value === '';
  }

  /**
   * Calls uploadImage from FileService
   * @param event is the event of file chooser
   */
  uploadFile(event) {
    const file = event.target.files[0];
    return this.fs.uploadImage(file);
  }


}
