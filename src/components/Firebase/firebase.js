import app from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyD1VWcFK14IxCYPMU1l0TAzTs6TILUstrU",
    authDomain: "fir-reactjs-5c32a.firebaseapp.com",
    databaseURL: "https://fir-reactjs-5c32a.firebaseio.com",
    projectId: "fir-reactjs-5c32a",
    storageBucket: "fir-reactjs-5c32a.appspot.com",
    messagingSenderId: "57951941232",
    appId: "1:57951941232:web:3a412d45a6d4e332127ab5",
    measurementId: "G-MWPYHQ503F"
};

class Firebase {
    constructor() {
        app.initializeApp(firebaseConfig);
        this.auth = app.auth();
    }

    // *** Auth API ***//
    doCreateUserWithEmailAndPassword = (email, password) =>
        this.auth.createUserWithEmailAndPassword(email, password);

    doSignInWithEmailAndPassword = (email, password) =>
        this.auth.signInWithEmailAndPassword(email, password);

    doSignOut = () => this.auth.signOut();

    doPasswordReset = email => this.auth.sendPasswordResetEmail(email);
    
    doPasswordUpdate = password =>
        this.auth.currentUser.updatePassword(password);
}
export default Firebase;