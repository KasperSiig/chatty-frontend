import { Component, OnInit } from '@angular/core';
import {MessageService} from '../../shared/services/message.service';
import {Message} from '../../shared/models/Message';

@Component({
  selector: 'app-send',
  templateUrl: './send.component.html',
  styleUrls: ['./send.component.scss']
})
export class SendComponent implements OnInit {

  message = '';
  Message: Message;

  constructor(private messageService: MessageService) { }

  ngOnInit() {
  }

  send(message: string) {
    this.Message.m = message;
    this.messageService.send(this.Message);

  }

}
