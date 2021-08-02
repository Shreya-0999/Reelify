import firebase from "firebase/app";
import 'firebase/auth';
import 'firebase/storage';
import 'firebase/firestore';

firebase.initializeApp(
    // {
    //     apiKey: "AIzaSyAritncQ134vERtN9MsI0GNyByEhoKy3qk",
    //     authDomain: "insta-clone-14302.firebaseapp.com",
    //     projectId: "insta-clone-14302",
    //     storageBucket: "insta-clone-14302.appspot.com",
    //     messagingSenderId: "628929687666",
    //     appId: "1:628929687666:web:23346f39bd31ed5b7c92eb"
    // }
    {
        apiKey: "AIzaSyBJ_Zse1WJtLbzB9gOqNItevZ_qlcKUXPw",
        authDomain: "insta-clone-84d6b.firebaseapp.com",
        projectId: "insta-clone-84d6b",
        storageBucket: "insta-clone-84d6b.appspot.com",
        messagingSenderId: "159948165000",
        appId: "1:159948165000:web:7bc6d290896678108a743d"
    }
)

export const auth = firebase.auth();

const firestore = firebase.firestore();
export const database = {
    users: firestore.collection('Users'),
    getCurrentTimeStamp: firebase.firestore.FieldValue.serverTimestamp
}

export const storage = firebase.storage();