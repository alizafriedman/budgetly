import React, { useState, useEffect } from 'react'
import { Button, onPress } from 'react-native-paper'
import firebase from 'firebase/app'
import { db } from '../api/auth'



const DeleteIncome = ({ incomeId }) => {

    const userId = firebase.auth().currentUser.uid
    const ref = db.collection(`users/${userId}/income`)

    const deleteIncome = async () => {
        await ref.doc(incomeId).delete();
    }

    return (
        <Button onPress={deleteIncome} >delete</Button>
    )
}



export default DeleteIncome;