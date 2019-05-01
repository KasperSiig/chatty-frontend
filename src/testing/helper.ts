import { Message } from '../app/shared/models/Message';
import { User } from '../app/shared/models/User';

export class Helper {
  messages: Message[] = [];

  /**
   * Creates an array of messages for testing.
   * @param amount Amount of messages to push
   */
  getMessages(amount: number) {
    for (let i = 0; i < amount; i++) {
      this.messages.push(
        {id: 'ID Test', content: 'Content test', sender: new User(), time: 123}
      );
    }
    return this.messages;
  }
}
