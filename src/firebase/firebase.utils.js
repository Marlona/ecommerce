import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const config = {
    apiKey: "AIzaSyCmyjpSQXxXhWsMsgzCHaU1RD3fxMGk6EU",
    authDomain: "ecommerce-db-8e886.firebaseapp.com",
    databaseURL: "https://ecommerce-db-8e886.firebaseio.com",
    projectId: "ecommerce-db-8e886",
    storageBucket: "",
    messagingSenderId: "933904944756",
    appId: "1:933904944756:web:fdb4feb5a9abf958"
  }

  firebase.initializeApp(config)

  export const auth = firebase.auth()
  export const firestore = firebase.firestore()

  const provider = new firebase.auth.GoogleAuthProvider()
  provider.setCustomParameters({ prompt: 'select_account' })
  export const signInWithGoogle = () => auth.signInWithPopup(provider)

  export default firebase