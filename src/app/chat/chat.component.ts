import { AfterViewChecked, AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MessageService } from '../shared/services/message.service';
import { Message } from '../shared/models/Message';
import { Subscription } from 'rxjs';
import { Store } from '@ngxs/store';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnDestroy, AfterViewChecked {

  @ViewChild('chat') chat: ElementRef;

  messages = [];
  messageCount = 0;
  subscription: Subscription;

  constructor(private ms: MessageService,
              private store: Store) {
  }

  ngOnInit() {
    this.subscription = this.store.select(state => state.messages.messages)
      .subscribe(messages => {
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
