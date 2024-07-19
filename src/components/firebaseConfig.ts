// firebaseConfig.ts
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Thay thế bằng cấu hình Firebase của bạn
const firebaseConfig = {
    apiKey: "AIzaSyCiFEJKubhDIZFdyB3yrPON0tLN0K4kWy4",
    authDomain: "tomisakae-c078f.firebaseapp.com",
    projectId: "tomisakae-c078f",
    storageBucket: "tomisakae-c078f.appspot.com",
    messagingSenderId: "1082522587085",
    appId: "1:1082522587085:web:29731e199f944171f8fe84",
    measurementId: "G-L8BP0T7QVF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export { db };
