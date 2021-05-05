import * as firebase from 'firebase';

const Config = {
    apiKey: "AIzaSyAbo5nuh7WF_lLP9oDxdpUmVXjWjtXwmZg",
    authDomain: "fir-reactnative-e6769.firebaseapp.com",
    databaseURL: "https://fir-reactnative-e6769-default-rtdb.firebaseio.com",
    projectId: "fir-reactnative-e6769",
    storageBucket: "fir-reactnative-e6769.appspot.com",
    messagingSenderId: "625807559965",
    appId: "1:625807559965:web:afd74872d4af5e881f25f4",
    measurementId: "G-CSPZ689799"
};
export default (firebaseConfig = firebase.initializeApp(Config));