
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCBo8RVwfcVv87EF5Zmu601iDID6OULrrk",
  authDomain: "peripheral-artery-diseas-4eb5a.firebaseapp.com",
  projectId: "peripheral-artery-diseas-4eb5a",
  storageBucket: "peripheral-artery-diseas-4eb5a.firebasestorage.app",
  messagingSenderId: "484939224731",
  appId: "1:484939224731:web:db570f856e6918c45a983e",
  measurementId: "G-CV8844RF2C"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const analytics = getAnalytics(app);

export default app;
