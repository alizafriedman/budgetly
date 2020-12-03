import React, {useState, useEffect} from 'react';
import { View } from 'react-native';
import { Button, Dialog, Portal, Provider, TextInput } from 'react-native-paper';
import {db} from '../api/auth'
import firebase from 'firebase/app'



const UpdateExpense = ({docId, category, name, amount, recurring}) => {
    const [visible, setVisible] = useState(false);
    const [updateCategory, setUpdateCategory] = useState(category)
    const [updateName, setUpdateName] = useState(name)
    const [updateAmount, setUpdateAmount] = useState(amount)
    const [updateRecurring, setUpdateRecurring] = useState(recurring)
    
    const userId = firebase.auth().currentUser.uid
    const ref = db.collection(`users/${userId}/expenses`)

    const showDialog = () => setVisible(true);
    const hideDialog = () => setVisible(false);
   
    const submitEdits = async (e) => {
        // e.preventDefault()
       await  ref.doc(docId).update({
            category: updateCategory,
            name: updateName,
            amount: parseInt(updateAmount),
            recurring: updateRecurring
        });
    }


    console.log(updateRecurring)
    
    return (
        <Provider>
            <View>
                <Button onPress={showDialog}>edit</Button>
                <Portal>
                    <Dialog visible={visible} onDismiss={hideDialog}>
                        <Dialog.Title>Update Expense</Dialog.Title>
                        <Dialog.Content>
                            <TextInput label={'category'} editable={true} value={updateCategory} onChangeText={setUpdateCategory} />
                            <TextInput label={'name'} editable={true} value={updateName} onChangeText={setUpdateName} />
                            <TextInput label={'amount'} editable={true} value={updateAmount} onChangeText={setUpdateAmount} />
                            <TextInput label={'recurring'} editable={true} value={updateRecurring} onChangeText={setUpdateRecurring} />
                            <Button onPress={submitEdits}>edit</Button>

                        </Dialog.Content>
                        <Dialog.Actions>
                            <Button onPress={hideDialog}>Done</Button>
                        </Dialog.Actions>
                    </Dialog>
                </Portal>
            </View>
        </Provider>
    );
};

export default UpdateExpense;