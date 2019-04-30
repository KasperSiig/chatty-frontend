import { Component, OnDestroy, OnInit } from '@angular/core';
import { MessageService } from '../shared/services/message.service';
import { Message } from '../shared/models/Message';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnDestroy {

  messages: Message[];
  subscription: Subscription;

  constructor(private ms: MessageService) {
  }

  /**
   * Receives all messages
   */
  ngOnInit() {
    this.subscription = this.ms.recieve().subscribe(messages => {
      this.messages = messages;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
