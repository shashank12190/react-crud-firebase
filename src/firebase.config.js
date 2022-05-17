import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'


const firebaseConfig = {
    apiKey: "AIzaSyCNsKw0xbacE3SxwxMyy60MnkmkHeqWqII",
    authDomain: "react-crud-4965b.firebaseapp.com",
    projectId: "react-crud-4965b",
    storageBucket: "react-crud-4965b.appspot.com",
    messagingSenderId: "818116387291",
    appId: "1:818116387291:web:5bfd50d60367e2df2a87fe"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app) 