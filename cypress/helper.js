import * as firebase from 'firebase';

firebase.initializeApp({
    apiKey: 'AIzaSyACbHPVt411FxZXU2_BKGOiplHdq8dgWCI',
    authDomain: 'chatty-dev-e0191.firebaseapp.com',
    databaseURL: 'https://chatty-dev-e0191.firebaseio.com',
    projectId: 'chatty-dev-e0191',
    storageBucket: 'chatty-dev-e0191.appspot.com',
    messagingSenderId: '911543914185'
  });

export function login() {
  cy.visit('http://localhost:4200');
  cy.get('.nameLogin').type('test@test.com');
  cy.get('.passLogin').type('password');
  cy.get('.loginBtn').click();
}

export async function createUser() {
  try {
    await fetch('http://localhost:5001/chatty-dev-e0191/us-central1/api/users/create', {
      method: 'POST',
      body: JSON.stringify({
        email: "test@test.com",
        password: "password",
        userName: "username",
        avatarURL: "https://firebasestorage.googleapis.com/v0/b/chatty-dev-e0191.appspot.com/o/avatars%2Favatar2.png?alt=media&token=d4d82edd-069b-48bf-aa83-b873223ca787"
      }),
      headers: {"Content-Type": "application/json; charset=utf-8"}
    });
  } catch (e) {
    console.log(e);
  }
}
