import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
//the keys and config data u see below are invalid and are here only as an example of the structure of this file
const app = firebase.initializeApp({ 
    apiKey: "AIzaSyDNnQCPuu7-J1lpEaxsqJuG1SJR6e89ICU",
    authDomain: "groupay-7cab2.firebaseapp.com",
    projectId: "groupay-7cab2",
    storageBucket: "groupay-7cab2.appspot.com",
    messagingSenderId: "87693499716",
    appId: "1:87693499716:web:04e41d11bee3981d8b4b11",
    measurementId: "G-3X0JMFSTJ7"
  })

export const auth = app.auth()
export default app
