import React, { useState, useEffect } from 'react'
import { Button, onPress } from 'react-native-paper'
import firebase from 'firebase/app'
import {db} from '../api/auth'



const DeleteExpense = ({ expenseId }) => {

    const userId = firebase.auth().currentUser.uid
    const ref = db.collection(`users/${userId}/expenses`)

    const deleteExpense = async () => {
        await ref.doc(expenseId).delete();
    }

    return (
        <Button onPress={deleteExpense} >delete</Button>
    )
}



export default DeleteExpense;