import {login, createUser} from "../helper";

describe('Testing Message Receive Functionality', () => {
  window.indexedDB.deleteDatabase('firebaseLocalStorageDb');

  it('should read messages', async () => {
    await createUser();
    login();

    cy.get('.message').should('be.visible');
  });
});
