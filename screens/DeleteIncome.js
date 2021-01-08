import React from 'react'
import { Button } from 'react-native-paper'


const DeleteIncome = ({ incomeId, incomeRef }) => {


    const deleteIncome = async () => {
        await incomeRef.doc(incomeId).delete();
    }

    return (
        <Button 
        style={{
            marginTop: '3%'
        }}
        onPress={deleteIncome} >delete</Button>
    )
}



export default DeleteIncome;