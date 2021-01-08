import React from 'react';
import { Button } from 'react-native-paper';


const DeleteExpense = ({ expenseId, expenseRef }) => {

    const deleteExpense = async () => {
        await expenseRef.doc(expenseId).delete();
    }

    return (
        <Button onPress={deleteExpense} >delete</Button>
    )
}



export default DeleteExpense;