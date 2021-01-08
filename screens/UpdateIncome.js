import React, {useState, useEffect} from 'react'
import {ScrollView, TouchableOpacity, View } from 'react-native'
import { Button, Dialog, Portal, Provider, TextInput} from 'react-native-paper'
import firebase from 'firebase/app'
import {db} from '../api/auth'


const UpdateIncome = ({incomeId, type, amount, incomeRef}) => {
    const[visible, setVisible] = useState(false)
    const [updateType, setUpdateType] = useState(type)
    const [updateAmount, setUpdateAmount] = useState(amount)

    const showDialog = () => setVisible(true)
    const hideDialog = () => setVisible(false)


    const submitEdits = async() => {
        setVisible(false)

        await incomeRef.doc(incomeId).set({
            type: updateType,
            amount: parseInt(updateAmount)
        })
    }

   
return (

    <Provider>
        <ScrollView>
            <Button onPress={showDialog} > edit here </Button>
            <Portal>
                <Dialog visible={visible}>
                    <Dialog.Title> update income </Dialog.Title>
                    <Dialog.Content>
                        <TextInput label={'type'} editable={true} value={updateType} onChangeText={setUpdateType} />
                        <TextInput label={'amount'} editable={true} value={updateAmount} onChangeText={setUpdateAmount} />
                        
                        <Button onPress={
                            ()=> {
                                hideDialog()
                                submitEdits()
                            }
                        } > submit edits </Button>

                    <Dialog.Actions>
                    </Dialog.Actions>
                    </Dialog.Content>
                </Dialog>
            </Portal>
        </ScrollView>
    </Provider>


)

}



export default UpdateIncome;