import * as firebase from 'firebase';

firebase.initializeApp({
  apiKey: 'AIzaSyACbHPVt411FxZXU2_BKGOiplHdq8dgWCI',
  authDomain: 'chatty-dev-e0191.firebaseapp.com',
  databaseURL: 'https://chatty-dev-e0191.firebaseio.com',
  projectId: 'chatty-dev-e0191',
  storageBucket: 'chatty-dev-e0191.appspot.com',
  messagingSenderId: '911543914185'
});

const auth = firebase.auth();
describe('Testing Creation Functionality', () => {
  window.indexedDB.deleteDatabase('firebaseLocalStorageDb');

  beforeEach(() => {
    auth.signInWithEmailAndPassword('test@test.com', 'password')
      .then(user => {
        user.user.delete().then().catch();
      })
      .catch()
  });

  it('should create user', () => {
    cy.visit('http://localhost:4200');
    cy.location('pathname').should('eq', '/login');
    cy.get('.nameCreate').type('cypress');
    cy.get('.mailCreate').type('test@test.com');
    cy.get('.passCreate1').type('password');
    cy.get('.passCreate2').type('password');

    cy.get('.createBtn').click();
    cy.location('pathname').should('eq', '/chat');
  });
});
