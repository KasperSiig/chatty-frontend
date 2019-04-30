import { Message } from '../app/shared/models/Message';
import { of } from 'rxjs';

export class Helper {
  messages: Message[] = [];

  /**
   * Creates an array of messages for testing.
   * @param amount
   */
  getMessages(amount: number) {
    for (let i = 0; i < amount; i++) {
      this.messages.push(
        {id: 'ID Test', content: 'Content test', sender: 'Sender test', time: 123}
      );
    }
    return this.messages;
  }
}
