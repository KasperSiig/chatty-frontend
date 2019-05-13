import { AfterViewChecked, AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MessageService } from '../shared/services/message.service';
import { Message } from '../shared/models/Message';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnDestroy, AfterViewChecked {

  @ViewChild('chat') chat: ElementRef;

  messages: Message[] = [];
  messageCount = 0;
  subscription: Subscription;

  constructor(private ms: MessageService) {
  }

  ngOnInit() {
    this.subscription = this.ms.recieve().subscribe(messages => {
      this.messages = messages;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  /**
   * Makes a userCheck if scroll should be activated
   */
  ngAfterViewChecked() {
    if (this.messageCount !== this.messages.length) {
      this.scrollToBottom();
      this.messageCount = this.messages.length;
    }
  }

  /**
   * Scrolls messageview to bottom
   */
  scrollToBottom() {
    const ref = this.chat.nativeElement as HTMLElement;
    ref.scrollTop = ref.scrollHeight;
  }

}
