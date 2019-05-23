import {createUser} from "../helper";

describe('Testing Login Functionality', () => {
  window.indexedDB.deleteDatabase('firebaseLocalStorageDb');

  beforeEach(async () => {
    await createUser();
  });

  it('should redirect to login', () => {
    cy.visit('http://localhost:4200');
    cy.location('pathname').should('eq', '/login');
  });

  it('should should enter login information', () => {
    cy.get('.nameLogin')
      .type('test@test.com').should('have.value', 'test@test.com');

    cy.get('.passLogin')
      .type('password').should('have.value', 'password');
  });

  it('should log user in', () => {
    cy.get('.loginBtn').click();
    cy.location('pathname').should('eq', '/chat');
  });
});
