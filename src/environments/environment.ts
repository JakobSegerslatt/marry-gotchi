// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyCo8HrgNz0-dfOrx8Igwi23SNA0bv1tSUM',
    authDomain: 'marry-gotchi.firebaseapp.com',
    databaseURL: 'https://marry-gotchi.firebaseio.com',
    projectId: 'marry-gotchi',
    storageBucket: 'marry-gotchi.appspot.com',
    messagingSenderId: '621207036085'
  }
};
