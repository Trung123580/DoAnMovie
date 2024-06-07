import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, TwitterAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
const firebaseConfig = {
  apiKey: 'AIzaSyCxYa2J53di8vwmo5iBOTQtxY0omDRw-q0',
  authDomain: 'movie-3cc64.firebaseapp.com',
  projectId: 'movie-3cc64',
  storageBucket: 'movie-3cc64.appspot.com',
  messagingSenderId: '1047168079463',
  appId: '1:1047168079463:web:973510d9e8dd6f4db726c2',
  measurementId: 'G-MF6NCKTFNG',
};
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const twitterProvider = new TwitterAuthProvider();
export const firebaseStorage = getStorage(app);
