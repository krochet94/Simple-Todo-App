import { initializeApp, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

function initializeAppIfNecessary() {
    try {
      return getApp();
    } catch (any) {
      const firebaseConfig = {
        apiKey: "AIzaSyACo0aPGqvMU4ddkXUnAxLZqHJ3Okrdv9E",
        authDomain: "sample-projects-76f17.firebaseapp.com",
        projectId: "sample-projects-76f17",
        storageBucket: "sample-projects-76f17.appspot.com",
        messagingSenderId: "483432717436",
        appId: "1:483432717436:web:b52b42770eaba62e167df9"
      };
      return initializeApp(firebaseConfig);
    }
  }

// Initialize Firebase & Firebase services
const firebaseApp = initializeAppIfNecessary();
const db = getFirestore(firebaseApp);

export { firebaseApp, db };
