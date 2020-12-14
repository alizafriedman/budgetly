import React, {useState, useEffect} from 'react'
import {ScrollView, TouchableOpacity, View } from 'react-native'
import { Button, Dialog, Portal, Provider, TextInput} from 'react-native-paper'
import firebase from 'firebase/app'
import {db} from '../api/auth'
// import Income from './Income'




const UpdateIncome = ({docId, type, amount, loading, setLoading, navigation}) => {
    const[visible, setVisible] = useState(false)
    const [updateType, setUpdateType] = useState(type)
    const [updateAmount, setUpdateAmount] = useState(amount)


    const userId = firebase.auth().currentUser.uid
    const ref = db.collection(`users/${userId}/income`).doc(docId)
    const showDialog = () => setVisible(true)
    const hideDialog = () => setVisible(false)

    const submitEdits = async() => {
        // if(loading) {
        //     setLoading(false)
        // }
        // await ref.doc(docId).set({
        //     type: updateType,
        //     amount: parseInt(updateAmount)
        // });
        await ref.set({
            type: updateType,
            amount: parseInt(updateAmount)
        })

        setUpdateType('')
        setUpdateAmount('')
        console.log(amount)
        console.log(updateAmount)
        setLoading(false)
        // setLoading(true)
    }

   
return (

    <Provider>
        <ScrollView>
            <Button onPress={showDialog}> edit here </Button>
            <Portal>
                <Dialog visible={visible} >
                    <Dialog.Title> update income </Dialog.Title>
                    <Dialog.Content>
                        <TextInput label={'type'} editable={true} value={updateType} onChangeText={(text) => setUpdateType(text, 'type')} />
                        <TextInput label={'amount'} editable={true} value={updateAmount} onChangeText={(text) => setUpdateAmount(text, 'amount')} />
                        
                        <Button onPress={submitEdits} > submit edits </Button>

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