import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBxweAEuUuozJ1z5orTbL_OGtKZ2LoEy7I",
  authDomain: "reaudio-71a06.firebaseapp.com",
  projectId: "reaudio-71a06",
  storageBucket: "reaudio-71a06.appspot.com",
  messagingSenderId: "78838786394",
  appId: "1:78838786394:web:41071d77dff9ac1cf82b63",
  measurementId: "G-2WDQ70VWDW",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const analytics = getAnalytics(app);
