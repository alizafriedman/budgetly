import React, { useState, useEffect } from 'react'
import { View, Appbar, FlatList, ScrollView } from 'react-native'
import { Button, TextInput, List, Provider, Dialog, Portal } from 'react-native-paper'
import firebase from 'firebase/app'
import {db} from '../api/auth'
import NavBar from './NavBar'
import UpdateIncome from './UpdateIncome'



const Income = ({navigation}) => {
    const [type, setType] = useState('')
    const [amount, setAmount] = useState('')
    const [loading, setLoading] = useState(true)
    const [docId, setDocId] = useState('')
    const [visible, setVisible] = useState(false)
    const [incomes, setIncomes] = useState([])
    const [visibleEdit, setVisibleEdit] = useState(false)


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

        })
    }, [])


    const addIncome = async () => {
        setVisible(false)

        await ref.add({
            type: type,
            amount: parseInt(amount),

        });

        setType('')
        setAmount('')

    }

    const deleteIncome = async () => {
        await ref.doc(docId).delete()
    };


    const DisplayIncome = ({docId, type, amount}) => {
        
        return (
            <View>
                <List.AccordionGroup>
                    <List.Accordion title={`Income Type: ${type}`} id='1' >
                        <List.Item title={`Type: ${type}`}/>
                        <List.Item title={`Amount: $${amount}`} />
                         
                        
                        {/* {visibleEdit && 
                            <UpdateIncome docId={docId} type={type} amount={amount} loading={loading} setLoading={setLoading} navigation={navigation} />
                         } */}
                        <UpdateIncome docId={docId} type={type} amount={amount} loading={loading} setLoading={setLoading} navigation={navigation} />
                        <View>
                            <Button onPress={() => deleteExpense()} >delete</Button>
                        </View>
                    </List.Accordion>
                </List.AccordionGroup>
            </View>
        )
    };


    return (
        <>
                <ScrollView>
                    <NavBar navigation={navigation} />
                    <Button onPress={() => setVisible(true)}>Add income</Button>

                    <FlatList
                        style={{ flex: 1 }}
                        data={incomes}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => <DisplayIncome {...item} style={{ color: '#661327' }} />}
                    />

                    {visible && 
                        <Provider>
                            <ScrollView>
                                <Portal>
                                    <Dialog visible={visible} >
                                        <Dialog.Title> add new income </Dialog.Title>
                                        <Dialog.Content>
                                            <TextInput label={'type'} value={type} onChangeText={setType} />
                                            <TextInput label={'amount'} value={amount} onChangeText={setAmount} />
                                        </Dialog.Content>

                                            <Dialog.Actions>
                                            <Button onPress={() => addIncome()} > submit income </Button>
                                            </Dialog.Actions>

                                    </Dialog>
                                </Portal>
                            </ScrollView>
                        </Provider>
                    }
            </ScrollView>
        </>
    )
}



export default Income;