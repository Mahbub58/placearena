// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics, Analytics } from "firebase/analytics";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCETRYIbCfJf4_KVeycitUjeLE-BBJN61g",
  authDomain: "placearena-323f6.firebaseapp.com",
  projectId: "placearena-323f6",
  storageBucket: "placearena-323f6.firebasestorage.app",
  messagingSenderId: "202220710234",
  appId: "1:202220710234:web:b61f54bc28c611bfe26b63",
  measurementId: "G-ZE2SNPL4C7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export the auth object
export const auth = getAuth(app);

// Initialize Analytics (only in browser environment)
let analytics: Analytics | null = null;
if (typeof window !== 'undefined') {
  try {
    analytics = getAnalytics(app);
    console.log('✅ Firebase Analytics initialized successfully');
  } catch (error) {
    console.warn('⚠️ Firebase Analytics blocked. This is normal if you have ad blockers enabled.', error);
    // Analytics will be null, but the app will continue to work
  }
}

export { analytics };
