import { Message } from '../../models/Message';
import { Action, NgxsOnInit, Selector, State, StateContext } from '@ngxs/store';
import { AddMessage } from '../actions/message.action';
import { MessageService } from '../../services/message.service';

class MessageStateModel {
  messages: Message[];
}

@State<MessageStateModel>({
  name: 'messages',
  defaults: {
    messages: []
  }
})
export class MessageState implements NgxsOnInit {

  constructor(private messageSvc: MessageService) {
  }

  @Selector()
  static getMessages(state: MessageStateModel) {
    return state.messages;
  }

  ngxsOnInit(ctx: StateContext<MessageStateModel>) {
    this.messageSvc.recieve().subscribe(messages => {
      ctx.setState({ messages: [...messages]});
    });
  }

  @Action(AddMessage)
  add({getState, patchState}: StateContext<MessageStateModel>, {payload}: AddMessage) {
    this.messageSvc.send(payload).subscribe();
  }
}
