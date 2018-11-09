import * as firebase from 'firebase';

     // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCJfivohMbjl26zRJPwsR772a-ejcku7s8",
    authDomain: "lab-work-18253.firebaseapp.com",
    databaseURL: "https://lab-work-18253.firebaseio.com",
    projectId: "lab-work-18253",
    storageBucket: "lab-work-18253.appspot.com",
    messagingSenderId: "627919497859"
  };
  firebase.initializeApp(config);

  const messaging = firebase.messaging()
  messaging.requestPermission()
   .then(() => messaging.getToken())
   .then((token) => console.log(token))
   .catch(err => console.log(err))

export default firebase