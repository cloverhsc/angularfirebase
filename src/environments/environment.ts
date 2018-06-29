// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    production: true,
    apiKey: 'AIzaSyAHzqNbIWcCJoQ6mHvtf3XblhzpWsCc5b0',
    authDomain: 'fir-test-3b1e6.firebaseapp.com',
    databaseURL: 'https://fir-test-3b1e6.firebaseio.com',
    projectId: 'fir-test-3b1e6',
    storageBucket: 'fir-test-3b1e6.appspot.com',
    messagingSenderId: '523984677948'
  }
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
