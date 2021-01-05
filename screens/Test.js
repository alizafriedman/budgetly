import React, {useState, useEffect} from 'react'
import {Button, onPress} from 'react-native-paper'
import firebase from 'firebase/app'
import {db} from '../api/auth'



const Test = ({goalId, goalName, projectedAmount, description, timeFrame}) => {

    const userId = firebase.auth().currentUser.uid
    const ref = db.collection(`users/${userId}/goals`)

    const deleteGoal = async () => {

        console.log(goalId)
        // console.log(docId)
        await ref.doc(goalId).delete();

    }
    // console.log('banana')
    // console.log(goalId)
    return (
    <Button onPress={deleteGoal} >delete</Button>
    )
}



export default Test;