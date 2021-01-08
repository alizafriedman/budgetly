import React from 'react';
import {Button} from 'react-native-paper';



const DeleteGoal = ({goalId, goalRef}) => {


    const deleteGoal = async () => {
        await goalRef.doc(goalId).delete();
    }
    
    return (
        <Button onPress={deleteGoal} >delete</Button>
    )
}



export default DeleteGoal;