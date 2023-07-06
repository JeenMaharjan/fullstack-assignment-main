    // import * as firebase from "firebase";
    import { initializeApp } from "firebase/app";
    import { getAuth, GoogleAuthProvider } from "firebase/auth";

    const firebaseConfig = {
        apiKey: "AIzaSyA2IjTGCDIBlf-Y5zS4elm0VapLaT7UnQc",
        authDomain: "demoo-daaeb.firebaseapp.com",
        projectId: "demoo-daaeb",
        storageBucket: "demoo-daaeb.appspot.com",
        messagingSenderId: "506587127951",
        appId: "1:506587127951:web:824e678dc54ad2c84e10fa",
        measurementId: "G-C102RH6Y5D"
    };


    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    const googleAuthProvider = new GoogleAuthProvider();

    export { auth, googleAuthProvider };