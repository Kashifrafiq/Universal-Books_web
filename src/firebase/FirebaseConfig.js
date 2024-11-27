import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAa-XCacq4oTcAPt22MRW2FdyZ-jvWa8jg",
  authDomain: "universal-books-497c3.firebaseapp.com",
  projectId: "universal-books-497c3",
  storageBucket: "universal-books-497c3.appspot.com",
  messagingSenderId: "733162559913",
  appId: "1:733162559913:web:655a118126751524ff8cb8",
  measurementId: "G-MKTQELZ9Q3"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);