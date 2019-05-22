/**
 * Is used to add a message to NGXS
 */
export class AddMessage {

  static readonly type = '[Message] Add';

  constructor(public payload) {}
}
