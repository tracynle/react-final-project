import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const config = {
    apiKey: "AIzaSyCjP8K6zMPMYsO5NNvDJa-aY74ytxf70O0",
    authDomain: "react-final-project-9a485.firebaseapp.com",
    databaseURL: "https://react-final-project-9a485.firebaseio.com",
    projectId: "react-final-project-9a485",
    storageBucket: "react-final-project-9a485.appspot.com",
    messagingSenderId: "694736034905",
    appId: "1:694736034905:web:415681533f6f0e6ff7e548",
    measurementId: "G-WZFZLD7T22"
};

firebase.initializeApp(config);


export default firebase;