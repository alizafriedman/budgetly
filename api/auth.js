import firebase from 'firebase/app';
import '@firebase/auth';
import '@firebase/firestore';
import apiKey from '../config/keys'


if (!firebase.apps.length) {
    console.log('connected with firebase')
    firebase.initializeApp(apiKey.firebaseConfig)
}

const db = firebase.firestore()

export async function registration(email, password, firstName, lastName) {
    await firebase.auth().createUserWithEmailAndPassword(email, password);
    const currentUser = firebase.auth().currentUser;
    console.log(currentUser)
    console.log(db)

    db.collection('users')
        .doc(currentUser.uid)
        .set({
            email: currentUser.email,
            lastName: lastName,
            firstName: firstName

        })
}

export async function signIn(email, password) {
    await firebase.auth().signInWithEmailAndPassword(email, password)

}


export async function logOut() {
    await firebase.auth().signOut()
}



export {db}