import React, { useState, useEffect } from 'react'
import { View, Appbar, FlatList, ScrollView } from 'react-native'
import { Button, TextInput, List, Provider, Dialog, Portal } from 'react-native-paper'
import firebase from 'firebase/app'
import {db} from '../api/auth'
import NavBar from './NavBar'
import UpdateIncome from './UpdateIncome'


//adding works + querying/get for display = needs delete, edit/update +  needs styling desperately


const Income = ({navigation}) => {
    const [type, setType] = useState('')
    const [amount, setAmount] = useState('')
    const [loading, setLoading] = useState(true)
    const [docId, setDocId] = useState('')
    const [visible, setVisible] = useState(false)
    const [incomes, setIncomes] = useState([])


    const userId = firebase.auth().currentUser.uid
    const ref = db.collection(`users/${userId}/income`)


    useEffect(() => {
        return ref.onSnapshot((querySnapshot) => {
            const incomeList = []
            querySnapshot.forEach(doc => {
                const { type, amount } = doc.data();
                setDocId(doc.id)
                incomeList.push({
                    id: doc.id,
                    type,
                    amount
                });
            });

            setIncomes(incomeList)
            setLoading(false)

            if (loading) {
                setLoading(false)
                return
            }
        })
    }, [])


    const addIncome = async () => {
        await ref.add({
            type: type,
            amount: parseInt(amount),

        });

        setType('')
        setAmount('')
        setVisible(false)

    }


    const deleteIncome = async () => {
        await ref.doc(docId).delete()
    };


    const DisplayIncome = ({type, amount}) => {
        return (
            <View>
                <List.AccordionGroup>
                    <List.Accordion title={`Income Type: ${type}`} id='1' >
                <List.Item title={`Type: ${type}`}/>
                        <List.Item title={`Amount: $${amount}`} />
                        <UpdateIncome docId={docId} type={type} amount={amount} loading={loading} setLoading={setLoading} navigation={navigation} />
                        {/* <Button onPress={() => deleteIncome()} >delete Income info</Button> */}
                    </List.Accordion>
                </List.AccordionGroup>
            </View>
        )
    };





    return (
        <>
            <View>
                <ScrollView>
                    <NavBar navigation={navigation} />
                    <Button onPress={() =>setVisible(true)} >Add income</Button>

                    <FlatList
                        style={{ flex: 1 }}
                        data={incomes}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => <DisplayIncome {...item} style={{ color: '#661327' }} />}
                    />

                    {visible && 
                    <Provider>
                        <ScrollView>
                            {/* <Button onPress={showDialog}> edit here </Button> */}
                            <Portal>
                                <Dialog visible={visible} >
                                    <Dialog.Title> update income </Dialog.Title>
                                    <Dialog.Content>
                                        <TextInput label={'type'} value={type} onChangeText={setType} />
                                        <TextInput label={'amount'} value={amount} onChangeText={setAmount} />

                                        <Button onPress={() => addIncome()} > submit edits </Button>

                                        <Dialog.Actions>
                                        </Dialog.Actions>
                                    </Dialog.Content>
                                </Dialog>

                            </Portal>

                        </ScrollView>
                    </Provider>

                    
                    }
                    {/* <TextInput label={'type'} value={type} onChangeText={setType} />
                    <TextInput label={'amount'} value={amount} onChangeText={setAmount} /> */}


                    
                </ScrollView>
            </View>
        </>
    )
}



export default Income;