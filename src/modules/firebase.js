import firebase from 'firebase';
import moment from 'moment';

console.log('Initialising Firebase..');
const config = {
  apiKey: 'AIzaSyACkw33DHwfz3XNZQOyEv4kDsbRK7XBLak',
  authDomain: 'lets-connect-1483426738332.firebaseapp.com',
  databaseURL: 'https://lets-connect-1483426738332.firebaseio.com',
  storageBucket: 'lets-connect-1483426738332.appspot.com',
  messagingSenderId: '516522971684',
};

firebase.initializeApp(config);

export const firebaseAuth = firebase.auth;

export function fbLogin() {
  var provider = new firebaseAuth.FacebookAuthProvider();
  firebaseAuth().signInWithPopup(provider).then(function(result) {
    // This gives you a Facebook Access Token. You can use it to access the Facebook API.
    // var token = result.credential.accessToken;
    // The signed-in user info.
    var user = result.user;
    console.log(`${user.displayName} successfully logged in via Facebook.`);
  }).catch(function(error) {
    console.log(`Oops.. there was an issue with logging in: ${error.message}`);
  });
}

export function saveBroadcast(broadcast) {
  const { latitude, longitude, accuracy } = broadcast.location.coords;

  return firebase.database().ref().child(`broadcasts/${broadcast.user.uid}`)
  .set({
    name: broadcast.user.displayName,
    photo: broadcast.user.photoURL,
    reason: broadcast.reason,
    duration: broadcast.duration,
    coordinates: { latitude, longitude },
    positionAccuracy: accuracy,
    sentAt: moment().format(),
    bio: broadcast.bio,
    locationDescription: broadcast.locationDescription,
  });
}

export function getBroadcasts(cb) {
  firebase.database().ref().child('broadcasts')
  .on('value', function(snapshot) {
    cb(snapshot.val());
  });
}

export function signOut() {
  firebaseAuth().signOut();
}
