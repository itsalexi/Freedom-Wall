// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: 'AIzaSyD-w3BNR_PDD4ZvKv2Wpj7jqIrL0Pqonq4',
    authDomain: 'freedom-wall-c37c1.firebaseapp.com',
    projectId: 'freedom-wall-c37c1',
    storageBucket: 'freedom-wall-c37c1.appspot.com',
    messagingSenderId: '975300373735',
    appId: '1:975300373735:web:b6510e0b1d25371a1e4642',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore();
