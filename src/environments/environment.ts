// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiUrl: 'https://us-central1-chatty-238611.cloudfunctions.net/api',
  config: {
    apiKey: 'AIzaSyBrQWERBNwkTluzudNWc6-8s9xPWOkqpfI',
    authDomain: 'chatty-238611.firebaseapp.com',
    databaseURL: 'https://chatty-238611.firebaseio.com',
    projectId: 'chatty-238611',
    storageBucket: 'chatty-238611.appspot.com',
    messagingSenderId: '911543914185'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
