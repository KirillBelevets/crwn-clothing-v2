// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDDjIWdLngxGYgDZBvp7SU_f4glfjkvGo8",
    authDomain: "crwn-db-8537d.firebaseapp.com",
    projectId: "crwn-db-8537d",
    storageBucket: "crwn-db-8537d.appspot.com",
    messagingSenderId: "1009218875715",
    appId: "1:1009218875715:web:8fe4a5f13876ba6bae7ff6",
    measurementId: "G-SZ4CESXQN1"
};

const firebaseApp = initializeApp(firebaseConfig);

const googleAuthProvider = new GoogleAuthProvider();
googleAuthProvider.setCustomParameters({
    prompt: "select_account"
})

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    console.log(userAuth);
};

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleAuthProvider);

export const db = getFirestore();
export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {
    if(!userAuth) return;
    const userDocRef = doc(db, 'users', userAuth.uid)
    console.log(userDocRef)

    const userSnapshot = await getDoc(userDocRef);
    console.log(userSnapshot);
    console.log(userSnapshot.exists());

    if (!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();
        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInformation,
            });
        } catch (error) {
            switch(error.code) {
                case 'auth/wrong-password':
                    alert('incorrect password for email');
                    break;
                case 'auth/user-not-found':
                    alert('no user associated with this email');
                    break;
                default:
                    console.log(error);
            }
            if(error.code === 'auth/wrong-password') {
                alert('incorrect password for email')
            }
            console.log('error creating the user', error.message);
        }
    }
    return userDocRef;
}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if(!email || !password) return;

    return await createUserWithEmailAndPassword(auth, email, password);
}

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
    if(!email || !password) return;

    return await signInWithEmailAndPassword(auth, email, password);
}

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) => {
    return onAuthStateChanged(auth, callback);
}
