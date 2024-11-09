import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyAkR6hfaGX-g5Guu5Vany6IBOFE2fjE7IQ',
  authDomain: 'fatto-teste-3ae81.firebaseapp.com',
  projectId: 'fatto-teste-3ae81',
  storageBucket: 'fatto-teste-3ae81.firebasestorage.app',
  messagingSenderId: '548432113695',
  appId: '1:548432113695:web:fdd83e9600f44d4727e52a',
};

const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore(firebaseApp);

export { db };
