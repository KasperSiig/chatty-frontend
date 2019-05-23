import {login, createUser} from "../helper";

describe('Testing Logout Functionality', () => {
  window.indexedDB.deleteDatabase('firebaseLocalStorageDb');

  it('should read messages', async () => {
    await createUser();
    login();

    cy.get('.logoutBtn').click();
    cy.location('pathname').should('eq', '/login');
  });
});
