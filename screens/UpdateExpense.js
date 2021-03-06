import React, {useState} from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Button, Dialog, Portal, Provider, TextInput } from 'react-native-paper';



const UpdateExpense = ({expenseId, category, name, amount, recurring, expenseRef}) => {
    const [visible, setVisible] = useState(false);
    const [updateCategory, setUpdateCategory] = useState(category);
    const [updateName, setUpdateName] = useState(name);
    const [updateAmount, setUpdateAmount] = useState(amount);
    const [updateRecurring, setUpdateRecurring] = useState(recurring);
    

    const showDialog = () => setVisible(true);
    const hideDialog = () => setVisible(false);

   
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
            <ScrollView style={styles.modal}>
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
                                    submitEdits()  }} >Submit</Button>
                       <Dialog.Actions>
                       </Dialog.Actions>
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
    modal: {
        marginTop: "10%"
    }


})

export default UpdateExpense;