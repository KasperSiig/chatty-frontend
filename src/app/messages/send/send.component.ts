import { Component, OnInit } from '@angular/core';
import { MessageService } from '../../shared/services/message.service';
import { Message } from '../../shared/models/Message';

@Component({
  selector: 'app-send',
  templateUrl: './send.component.html',
  styleUrls: ['./send.component.scss']
})
export class SendComponent implements OnInit {

  message: Message;

  constructor(private messageService: MessageService) { }

  ngOnInit() {
  }

  /**
   * Sends message content and name of sender to MessageService
   * @param message
   * @param sender
   */
  send(message: string, sender: string)  {
    this.message = new Message();
    this.message.content = message;
    this.message.sender = sender;
    this.messageService.send(this.message);
  }

}
