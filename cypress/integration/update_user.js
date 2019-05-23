import {login, createUser} from "../helper";

describe('Testing Updating Functionality', () => {
  window.indexedDB.deleteDatabase('firebaseLocalStorageDb');

  it('should update user', async () => {
    await createUser();
    login();
    cy.get('.headerAvatar').click();
    cy.get('.editBtn').click();
    cy.get('.nameInput').clear().type('cypress-user');
    cy.get('.checkBtn').click();
    cy.get('.name').contains('cypress-user');
  });
});
