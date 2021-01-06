import React, {useState, useEffect} from 'react';
import { ScrollView, TouchableOpacity, View, StyleSheet, ShadowPropTypesIOS } from 'react-native';
import { Button, Dialog, Portal, Provider, TextInput } from 'react-native-paper';
import firebase from 'firebase/app'
import { db } from '../api/auth'


const UpdateExpense = ({expenseId, category, name, amount, recurring}) => {
    const [visible, setVisible] = useState(false);
    const [updateCategory, setUpdateCategory] = useState(category)
    const [updateName, setUpdateName] = useState(name)
    const [updateAmount, setUpdateAmount] = useState(amount)
    const [updateRecurring, setUpdateRecurring] = useState(recurring)
    

    const showDialog = () => setVisible(true);
    const hideDialog = () => setVisible(false);

    const userId = firebase.auth().currentUser.uid
    const expenseRef = db.collection(`users/${userId}/expenses`)

   
    const submitEdits = async () => {
        setVisible(false)

       await  expenseRef.doc(expenseId).set({
           amount: parseInt(updateAmount),
            category: updateCategory,
            name: updateName,
            recurring: updateRecurring
        });        
    }


    return (
        <Provider>
            <ScrollView>
                <Button onPress={showDialog}>edit</Button>
                <Portal>
                    <Dialog visible={visible}>
                        <Dialog.Title>Update Expense</Dialog.Title>
                        <Dialog.Content>
                            <TextInput label={'category'} editable={true} value={updateCategory} onChangeText={setUpdateCategory} />
                            <TextInput label={'name'} editable={true} value={updateName} onChangeText={setUpdateName} />
                            <TextInput label={'amount'} editable={true} value={updateAmount} onChangeText={setUpdateAmount} />
                            <TextInput label={'recurring'} editable={true} value={updateRecurring} onChangeText={setUpdateRecurring} />
                            
                            <Button style={styles.button} onPress={() => 
                                {   hideDialog()
                                    submitEdits()  }} >done edits</Button>
                       
                       </Dialog.Content>
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