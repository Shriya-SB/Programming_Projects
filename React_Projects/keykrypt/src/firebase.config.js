import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAU9o6uIqjyl50DxuCx3bgp8MwRl8j7QU8",
    authDomain: "keykrypt-1b367.firebaseapp.com",
    projectId: "keykrypt-1b367",
    storageBucket: "keykrypt-1b367.appspot.com",
    messagingSenderId: "150178511090",
    appId: "1:150178511090:web:54554248bbf07cedd9386b"
};

export const app = initializeApp(firebaseConfig);
export default firebaseConfig;