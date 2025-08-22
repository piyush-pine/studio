import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  projectId: 'dharma-treasury',
  appId: '1:503946405167:web:923c763958781b274a2dda',
  storageBucket: 'dharma-treasury.firebasestorage.app',
  apiKey: 'AIzaSyDdlzQD_TsZB55y5bP8SI9jAOpFJ5BegHc',
  authDomain: 'dharma-treasury.firebaseapp.com',
  messagingSenderId: '503946405167',
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);

export { app, auth };
