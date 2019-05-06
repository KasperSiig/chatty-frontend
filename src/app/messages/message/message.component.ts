import { Component, Input, OnInit } from '@angular/core';
import { Message } from '../../shared/models/Message';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {

  // Contains info about the message
  @Input() message = new Message();

  constructor() {
  }

  ngOnInit() {
  }

}
