import React, {useState, useEffect} from 'react'
import {ScrollView, TouchableOpacity, View } from 'react-native'
import { Button, Dialog, Portal, Provider, TextInput} from 'react-native-paper'
import firebase from 'firebase/app'
import {db} from '../api/auth'
// import Income from './Income'




const UpdateIncome = ({docId, type, amount, loading}) => {
    const[visible, setVisible] = useState(false)
    const [updateType, setUpdateType] = useState(type)
    const [updateAmount, setUpdateAmount] = useState(amount)



    const userId = firebase.auth().currentUser.uid
    const ref = db.collection(`users/${userId}/income`)

    const showDialog = () => setVisible(true)
    const hideDialog = () => setVisible(false)

    const submitEdits = async() => {
        if(loading) {
            setLoading(false)
        }
        await ref.doc(docId).set({
            type: updateType,
            amount: parseInt(updateAmount)
        });
    }

    console.log(docId)
    console.log(updateType)
    console.log(type)
return (

    <Provider>
        <ScrollView>
            <Button onPress={showDialog}> edit here </Button>
            <Portal>
                <Dialog visible={visible} >
                    <Dialog.Title> update income </Dialog.Title>
                    <Dialog.Content>
                        <TextInput label={'type'} editable={true} value={updateType} onChangeText={(text) => setUpdateType(text)} />
                        <TextInput label={'amount'} editable={true} value={updateAmount} onChangeText={(text) => setUpdateAmount(text)} />
                        
                        <Button onPress={submitEdits} > submit edits </Button>

                    <Dialog.Actions>
                        {/* <Button onPress={hideDialog} > close dialog </Button> */}
                    </Dialog.Actions>
                    </Dialog.Content>
                </Dialog>

            </Portal>

        </ScrollView>
    </Provider>


)

}



export default UpdateIncome;