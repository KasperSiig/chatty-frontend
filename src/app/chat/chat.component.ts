import {Component, OnInit} from '@angular/core';
import {MessageService} from '../shared/services/message.service';
import {Message} from '../shared/models/Message';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  messages: Message[];

  constructor(private ms: MessageService) {
  }

  /**
   * Receives all messages
   */
  ngOnInit() {
    this.ms.recieve().subscribe(messages => {
      this.messages = messages;
    });
  }

}
