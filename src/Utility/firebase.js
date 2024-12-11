// import { initializeApp } from "firebase/app";
// //Authentication Service 
// import {getAuth} from 'firebase/auth'
// import 'firebase/compat/firestore'
// import 'firebase/compat/auth'

// // Your web app's Firebase configuration
// const firebaseConfig = {
//     apiKey: "AIzaSyC04JjUfrsNBE76OKMPPqGxr-jt38aTuaU",
//     authDomain: "clone-38cff.firebaseapp.com",
//     projectId: "clone-38cff",
//     storageBucket: "clone-38cff.firebasestorage.app",
//     messagingSenderId: "469673309510",
//     appId: "1:469673309510:web:15b6efec1c1c6ca97ce147"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// export const auth = getAuth(app)
// export const db = app.firestore()



//--------------------------------------------


// import { initializeApp } from "firebase/app";
// // Authentication Service
// import { getAuth } from "firebase/auth";
// import { getFirestore } from "firebase/firestore";

// // Your web app's Firebase configuration
// const firebaseConfig = {
//     apiKey: "AIzaSyC04JjUfrsNBE76OKMPPqGxr-jt38aTuaU",
//     authDomain: "clone-38cff.firebaseapp.com",
//     projectId: "clone-38cff",
//     storageBucket: "clone-38cff.appspot.com",
//     messagingSenderId: "469673309510",
//     appId: "1:469673309510:web:15b6efec1c1c6ca97ce147",
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// export const auth = getAuth(app);
// export const db = app.firestore();


//----------------------------------------------
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC04JjUfrsNBE76OKMPPqGxr-jt38aTuaU",
    authDomain: "clone-38cff.firebaseapp.com",
    projectId: "clone-38cff",
    storageBucket: "clone-38cff.appspot.com",
    messagingSenderId: "469673309510",
    appId: "1:469673309510:web:15b6efec1c1c6ca97ce147",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Use modular Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);