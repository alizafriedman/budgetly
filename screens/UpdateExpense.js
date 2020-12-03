import React, {useState, useEffect} from 'react';
import { View } from 'react-native';
import { Button, Paragraph, Dialog, Portal, Provider, TextInput } from 'react-native-paper';

const UpdateExpense = ({category, name, amount, recurring}) => {
    const [visible, setVisible] = useState(false);
    const [updateCategory, setUpdateCategory] = useState(category)
    const [updateName, setUpdateName] = useState(name)
    const [updateAmount, setUpdateAmount] = useState(amount)
    const [updateRecurring, setUpdateRecurring] = useState(recurring)




    const showDialog = () => setVisible(true);

    const hideDialog = () => setVisible(false);
   

    return (
        <Provider>
            <View>
                <Button onPress={showDialog}>edit</Button>
                <Portal>
                    <Dialog visible={visible} onDismiss={hideDialog}>
                        <Dialog.Title>Alert</Dialog.Title>
                        <Dialog.Content>
                            <TextInput label={'category'} editable={true} value={updateCategory} onChangeText={setUpdateCategory} />
                            <TextInput label={'name'} editable={true} value={updateName} onChangeText={setUpdateName} />
                            <TextInput label={'amount'} editable={true} value={updateAmount} onChangeText={setUpdateAmount} />
                            <TextInput label={'recurring'} editable={true} value={updateRecurring} onChangeText={setUpdateRecurring} />

                       
                       
                       
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