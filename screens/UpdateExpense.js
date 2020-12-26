import React, {useState, useEffect} from 'react';
import { ScrollView, TouchableOpacity, View, StyleSheet, ShadowPropTypesIOS } from 'react-native';
import { Button, Dialog, Portal, Provider, TextInput } from 'react-native-paper';
import {db} from '../api/auth'
import firebase from 'firebase/app'



const UpdateExpense = ({docId, category, name, amount, recurring, setCategory}) => {
    const [visible, setVisible] = useState(false);
    const [updateCategory, setUpdateCategory] = useState(category)
    const [updateName, setUpdateName] = useState(name)
    const [updateAmount, setUpdateAmount] = useState(amount)
    const [updateRecurring, setUpdateRecurring] = useState(recurring)
    const [loading, setLoading] = useState(true)
    
    const userId = firebase.auth().currentUser.uid
    const ref = db.collection(`users/${userId}/expenses`)

    const showDialog = () => setVisible(true);
    const hideDialog = () => setVisible(false);
   
    const submitEdits = async (e) => {
        hideDialog();
        setVisible(false)
        // e.preventDefault()
       await  ref.doc(docId).set({
           amount: parseInt(updateAmount),
            category: updateCategory,
            name: updateName,
            recurring: updateRecurring
        });        
    }

    return (
        <Provider>
            <ScrollView>
                <Button onPress={() => showDialog()}>edit</Button>
                <Portal>
                    <Dialog visible={visible}>
                        <Dialog.Title>Update Expense</Dialog.Title>
                        <Dialog.Content>
                            <TextInput label={'category'} editable={true} value={updateCategory} onChangeText={(text) => setUpdateCategory(text)} />
                            <TextInput label={'name'} editable={true} value={updateName} onChangeText={(text) => setUpdateName(text)} />
                            <TextInput label={'amount'} editable={true} value={updateAmount} onChangeText={(text)=> setUpdateAmount(text)} />
                            <TextInput label={'recurring'} editable={true} value={updateRecurring} onChangeText={(text) => setUpdateRecurring(text)} />
                            {/* <TouchableOpacity  > */}
                                <Button style={styles.button} onPress={() => 
                                    {   hideDialog()
                                        submitEdits()  }} >done edits</Button>
                            {/* </TouchableOpacity> */}
                        </Dialog.Content>
                        <Dialog.Actions>
                            {/* <Button onPress={hideDialog}>Done</Button> */}
                        </Dialog.Actions>
                    </Dialog>
                </Portal>
            </ScrollView>
        </Provider>
    );
};

const styles = StyleSheet.create({

    button: {
        backgroundColor: '#3D2247',
        marginLeft: 15,
        marginRight: 15,
        marginBottom: 10,
        minHeight: 50,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: 'center',
        minWidth: 100,
        height: 8,
        zIndex: 100

    },


})

export default UpdateExpense;