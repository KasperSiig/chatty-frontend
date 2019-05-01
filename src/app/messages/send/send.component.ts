import { Component, OnInit } from '@angular/core';
import { MessageService } from '../../shared/services/message.service';

@Component({
  selector: 'app-send',
  templateUrl: './send.component.html',
  styleUrls: ['./send.component.scss']
})
export class SendComponent implements OnInit {

  constructor(private messageService: MessageService) {
  }

  ngOnInit() {
  }

  /**
   * Sends message content and name of sender to MessageService
   * @param message Content of message to be sent
   */
  send(message: string) {
    this.messageService.send(message);
  }

}
