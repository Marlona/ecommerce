import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const config = {
    apiKey: "AIzaSyCIAjEaJb6wTAk5LwCLnu_mkPgLi0RrOLM",
    authDomain: "ecommerce-db-13d5e.firebaseapp.com",
    databaseURL: "https://ecommerce-db-13d5e.firebaseio.com",
    projectId: "ecommerce-db-13d5e",
    storageBucket: "",
    messagingSenderId: "195138758195",
    appId: "1:195138758195:web:fac5bfa745390d18"
  }

  firebase.initializeApp(config)

  export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
