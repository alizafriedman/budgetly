import React, {useState, useEffect} from 'react'
import {ScrollView, TouchableOpacity, View } from 'react-native'
import { Button, Dialog, Portal, Provider, TextInput} from 'react-native-paper'
import firebase from 'firebase/app'
import {db} from '../api/auth'
// import Income from './Income'




const UpdateIncome = ({docId, type, amount, loading, setLoading, navigation, setVisibleEdit}) => {
    const[visible, setVisible] = useState(false)
    const [updateType, setUpdateType] = useState(type)
    const [updateAmount, setUpdateAmount] = useState(amount)

    const showDialog = () => setVisible(true)
    const hideDialog = () => setVisible(false)

    const userId = firebase.auth().currentUser.uid
    const ref = db.collection(`users/${userId}/income`).doc(docId)

   

    const submitEdits = async() => {
        setVisible(false)

        await ref.doc(docId).set({
            type: updateType,
            amount: parseInt(updateAmount)
        })

        // setUpdateType('')
        // setUpdateAmount('')
       
    }

   
return (

    <Provider>
        <ScrollView>
            <Button onPress={showDialog} onPressOut={hideDialog} > edit here </Button>
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