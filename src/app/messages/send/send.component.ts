import { Component, OnInit } from '@angular/core';
import { MessageService } from '../../shared/services/message.service';
import { FormControl, FormGroup } from '@angular/forms';

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

  constructor(private messageService: MessageService) {
  }

  ngOnInit() {
  }

  /**
   * Sends message content and name of sender to MessageService
   * @param message Content of message to be sent
   */
  send() {
    this.messageService.send(this.messageForm.get('message').value).subscribe();
  }

  /**
   * Checks if input field has a value
   */
  isMessage() {
    if (this.messageForm.get('message').value == null || this.messageForm.get('message').value === '') {
      this.isDisabled = true;
    } else {
      this.isDisabled = false;
    }
  }

}
