import {login, createUser} from "../helper";

const uuidv4 = require('uuid/v4');

describe('Message functionality', () => {
  window.indexedDB.deleteDatabase('firebaseLocalStorageDb');

  it('should send a message', async () => {
    await createUser();
    login();

    const msg = uuidv4();

    cy.get('.msgSend').type(msg.toString());
    cy.get('.msgBtn').click();
    cy.get('.messages').contains(msg.toString());
  });

  it('should upload file', () => {
    cy.fixture('../../src/assets/imgs/Chattylogo.png').as('logo')
      .get('input[type=file]').then(function (el) {
      return Cypress.Blob.base64StringToBlob(this.logo, 'image/png')
        .then(blob => {
          el[0].files[0] = blob;
          el[0].dispatchEvent(new Event('change', {bubbles: true}))
        })
    })
  });
});
