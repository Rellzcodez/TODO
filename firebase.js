import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyBwm8ioNS92LmxVlbnaQdJKcrStPAonSeI",
  authDomain: "full-stack-todo.firebaseapp.com",
  projectId: "full-stack-todo",
  storageBucket: "full-stack-todo.appspot.com",
  messagingSenderId: "394598061344",
  appId: "1:394598061344:web:51c6fd456cc5966a9af345",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
