import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDdlzQD_TsZB55y5bP8SI9jAOpFJ5BegHc",
  authDomain: "dharma-treasury.firebaseapp.com",
  projectId: "dharma-treasury",
  storageBucket: "dharma-treasury.appspot.com",
  messagingSenderId: "503946405167",
  appId: "1:503946405167:web:923c763958781b274a2dda",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);

export { app, auth };
