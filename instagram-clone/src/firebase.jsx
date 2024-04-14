// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage} from "firebase/storage";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
    apiKey: "AIzaSyDhAK8VwMmuZ5p45Z0DnLJWxoVa3r_F4QU",
    authDomain: "instagram-clone-sandipan.firebaseapp.com",
    projectId: "instagram-clone-sandipan",
    storageBucket: "instagram-clone-sandipan.appspot.com",
    messagingSenderId: "147029116410",
    appId: "1:147029116410:web:d48f975f659700c452d043",
    measurementId: "G-CD30L0F11C"
  };
//   const storage=firebase.storage();


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);
  export  {db,auth,storage};