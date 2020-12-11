import React, {useState, useEffect} from 'react'
import {ScrollView, TouchableOpacity, View } from 'react-native'
import { Button, Dialog, Portal, Provider, TextInput} from 'react-native-paper'
import firebase from 'firebase/app'
import {db} from '../api/auth'
import Income from './Income'




const UpdateIncome = ({docId, type, amount}) => {
    const[visible, setVisible] = useState(false)
    const [updateType, setUpdateType] = useState(type)
    const [updateAmount, setUpdateAmount] = useState(amount)


    //is there a way to pass this down as props from App or another component -
    //maybe add to misc file in api somehow

    const userId = firebase.auth().currentUser.uid
    const ref = db.collection(`users/${userId}/income`)

    const showDialog = () => setVisible(true)
    const hideDialog = () => setVisible(false)

    const submitEdits = async() => {
        await ref.doc(docId).set({
            type: updateType,
            amount: parseInt(updateAmount)
        });
        hideDialog()
    }


return (

    <Provider>
        <ScrollView>
            <Button onPress={showDialog}> edit here </Button>
            <Portal>
                <Dialog visible={visible} >
                    <Dialog.Title> update income </Dialog.Title>
                    <Dialog.Content>
                        <TextInput label={'type'} editable={true} value={updateType} onChangeText={(text) => setUpdateType(text)} />
                        <TextInput label={'amount'} editable={true} value={updateAmount} onChangeText={setUpdateAmount} />
                        
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