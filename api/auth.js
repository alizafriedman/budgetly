import * as firebase from 'firebase';
import 'firebase/firestore';



export async function registration(email, password, firstName, lastName) {
    await firebase.auth().createUserWithEmailAndPassword(email, password);
    const currentUser = firebase.auth().currentUser
    const db = firebase.firestore()

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

