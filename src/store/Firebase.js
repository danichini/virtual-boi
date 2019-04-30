import * as firebase from 'firebase';

const config = {
  apiKey: "AIzaSyC99jyneD0FbCfOkr1XwJWUv0ECvSIOCHE",
  authDomain: "virtual-boi-uru.firebaseapp.com",
  databaseURL: "https://virtual-boi-uru.firebaseio.com",
  projectId: "virtual-boi-uru",
  storageBucket: "virtual-boi-uru.appspot.com",
  messagingSenderId: "1082857842463"
};
firebase.initializeApp(config);

export const authentication = firebase.auth();
export const database = firebase.database();
export const storage = firebase.storage()