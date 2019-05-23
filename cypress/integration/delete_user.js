import { login, createUser } from "../helper";

describe('Testing Deletion Functionality', () => {
  window.indexedDB.deleteDatabase('firebaseLocalStorageDb');

  it('should delete user', async () => {
    await createUser();
    login();
    cy.get('.headerAvatar').click();
    cy.get('.deleteBtn').click();
    cy.location('pathname').should('eq', '/login');
  });
});
