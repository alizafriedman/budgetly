import React, {useState, useEffect} from 'react'
import {Button, onPress} from 'react-native-paper'
import firebase from 'firebase/app'
import {db} from '../api/auth'



const DeleteGoal = ({goalId}) => {

    const userId = firebase.auth().currentUser.uid
    const ref = db.collection(`users/${userId}/goals`)

    const deleteGoal = async () => {
        await ref.doc(goalId).delete();

    }
    return (
    <Button onPress={deleteGoal} >delete</Button>
    )
}



export default DeleteGoal;