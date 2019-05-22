import { Message } from '../../models/Message';
import { Action, NgxsOnInit, Selector, State, StateContext } from '@ngxs/store';
import { AddMessage } from '../actions/message.action';
import { MessageService } from '../../services/message.service';

/**
 * Contains the Model for the state
 */
export class MessageStateModel {
  messages: Message[];
}

/**
 * Defines the state
 */
@State<MessageStateModel>({
  name: 'messages',
  defaults: {
    messages: []
  }
})
export class MessageState implements NgxsOnInit {

  constructor(private messageSvc: MessageService) {
  }

  /**
   * Gets all messages
   * @param state State to get messages from
   */
  @Selector()
  static getMessages(state: MessageStateModel) {
    return state.messages;
  }

  ngxsOnInit(ctx: StateContext<MessageStateModel>) {
    this.messageSvc.recieve().subscribe(messages => {
      ctx.setState({ messages: [...messages]});
    });
  }

  /**
   * Adds message to Firebase
   * @param getState Is used to get current state
   * @param patchState Is used to patch current state
   * @param payload Message to be sent
   */
  @Action(AddMessage)
  add({getState, patchState}: StateContext<MessageStateModel>, {payload}: AddMessage) {
    this.messageSvc.send(payload).subscribe();
  }
}
