import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBJkKsZO9U9qIdaYskeAkJ8GkAbYEzb9ic",

  authDomain: "webpocketdoc-database.firebaseapp.com",

  projectId: "webpocketdoc-database",

  storageBucket: "webpocketdoc-database.appspot.com",

  messagingSenderId: "324301026811",

  appId: "1:324301026811:web:ea680e2afa141c7bb0075e",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);
