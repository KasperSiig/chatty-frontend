import { Message } from '../app/shared/models/Message';
import { User } from '../app/shared/models/User';

export class Helper {
  messages: Message[] = [];
  users: User[] = [];

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

  getUsers(amount: number) {
    for (let i = 0; i < amount; i++) {
      this.users.push(
        {userName: 'Test name', avatarUrl: 'www.test.dk'}
      );
    }
    return this.users;
  }
}
