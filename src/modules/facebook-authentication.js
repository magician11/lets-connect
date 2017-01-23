import firebase from 'firebase';

const init = () => {
  const config = {
    apiKey: 'AIzaSyACkw33DHwfz3XNZQOyEv4kDsbRK7XBLak',
    authDomain: 'lets-connect-1483426738332.firebaseapp.com',
    databaseURL: 'https://lets-connect-1483426738332.firebaseio.com',
    storageBucket: 'lets-connect-1483426738332.appspot.com',
    messagingSenderId: '516522971684',
  };

  firebase.initializeApp(config);
};

// Returns an object with these properties https://firebase.google.com/docs/reference/js/firebase.User
const getCurrentUser = () => firebase.auth().currentUser;

const isAuthenticated = () => !!getCurrentUser();

const login = () => {
  const provider = new firebase.auth.FacebookAuthProvider();

  const currentUser = firebase.auth().currentUser;

  if (currentUser) {
    // console.log('Already signed in..');
    return Promise.resolve(currentUser);
  }

  return new Promise((resolve, reject) => {
    firebase.auth().signInWithPopup(provider)
    .then((result) => {
      resolve(result.user);
    })
    .catch(error => reject(error));
  });
};

const signOut = () => firebase.auth().signOut();

export default { init, isAuthenticated, login, getCurrentUser, signOut };
