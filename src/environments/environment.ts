// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  //urlBase: 'https://d708de12.ngrok.io/api/v1/',
  urlBase: 'https://web.eyewallet.com/api/v1/',
  //urlAvatar: 'https://d708de12.ngrok.io/api/web/',
  urlAvatar: 'https://web.eyewallet.com/web/',
  //flag: 'https://d708de12.ngrok.io/web/uploads/flags/',
  flag: 'https://web.eyewallet.com/web/uploads/flags/',
  apiKeyLocation: '2b154f971e3ab7',
  //urlSocket: 'https://ba2d6c29.ngrok.io',
  urlSocket: 'https://web.eyewallet.com:3002'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
