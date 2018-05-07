import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyBBZg1e13X5wYokDaBlcpRrmnUmwz2oKow",
    authDomain: "website-checklist.firebaseapp.com",
    databaseURL: "https://website-checklist.firebaseio.com",
    projectId: "website-checklist",
    storageBucket: "website-checklist.appspot.com",
    messagingSenderId: "928773175012"
  };
  firebase.initializeApp(config);

  export default firebase;