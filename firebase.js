import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  //   apiKey: process.env.NEXT_PUBLIC_APIKEY,
  //   authDomain: process.env.NEXT_PUBLIC_AUTHDOMAIN,
  //   databaseURL: process.env.NEXT_PUBLIC_DATABASE_URL,
  //   projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  //   storageBucket: process.env.NEXT_PUBLIC_STORAGEBUCKET,
  //   messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  //   appId: process.env.NEXT_PUBLIC_APP_ID,
  apiKey: "AIzaSyBvoSTSfA0DN5N6f9Ml8TVUDkGIjNkCFMg",
  authDomain: "greydive-challenge-a67ab.firebaseapp.com",
  databaseURL: "https://greydive-challenge-a67ab-default-rtdb.firebaseio.com",
  projectId: "greydive-challenge-a67ab",
  storageBucket: "greydive-challenge-a67ab.appspot.com",
  messagingSenderId: "409712806626",
  appId: "1:409712806626:web:cc8bfbabfc48024c6facbb",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Realtime Database and get a reference to the service
export const database = getDatabase(app);
