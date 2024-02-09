import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBakbDwxzFtLh3yLqR7ng1pqptjZH3q02Y",
  authDomain: "fir-demo-542d8.firebaseapp.com",
  projectId: "fir-demo-542d8",
  storageBucket: "fir-demo-542d8.appspot.com",
  messagingSenderId: "10851825900",
  appId: "1:10851825900:web:4c51380967e98a12b3cdc9",
  measurementId: "G-N005CBBM0P",
  databaseUrl : "https://fir-demo-542d8-default-rtdb.firebaseio.com"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
