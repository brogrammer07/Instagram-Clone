import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyCuop-6iEiQcOAvcpiFy-MKPLQEgwmFyEE",
  authDomain: "instagram-clone-d7fa6.firebaseapp.com",
  projectId: "instagram-clone-d7fa6",
  storageBucket: "instagram-clone-d7fa6.appspot.com",
  messagingSenderId: "1051320158406",
  appId: "1:1051320158406:web:625b2b917669b0d6c2efc7"
};

// const firebaseConfig = {
//   apiKey: "AIzaSyDD7gG8SIR774DXekLfuQutCBoMFoQTUHA",
//   authDomain: "test-only-506d3.firebaseapp.com",
//   projectId: "test-only-506d3",
//   storageBucket: "test-only-506d3.appspot.com",
//   messagingSenderId: "527016736393",
//   appId: "1:527016736393:web:399cf09c9ba41d0d5f7858"
// };




const app =!getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();

export { app ,db ,storage };