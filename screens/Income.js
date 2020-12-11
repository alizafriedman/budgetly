import React, { useState, useEffect } from 'react'
import { View, Appbar, FlatList, ScrollView } from 'react-native'
import { Button, TextInput, List } from 'react-native-paper'
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

    }


    const DisplayIncome = ({type, amount}) => {
        return (
            <View>
                <List.AccordionGroup>
                    <List.Accordion title={`Income Type: ${type}`} id='1' >
                <List.Item title={`Type: ${type}`}/>
                        <List.Item title={`Amount: $${amount}`} />
                        <UpdateIncome docId={docId} type={type} amount={amount} />
                    </List.Accordion>
                </List.AccordionGroup>
            </View>
        )
    };

    
    const deleteIncome = async () => {
        await ref.remove(`users/${userId}/income`)
    };

    return (
        <>
            <View>
                <ScrollView>
                    <NavBar navigation={navigation} />

                    <FlatList
                        style={{ flex: 1 }}
                        data={incomes}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => <DisplayIncome {...item} style={{ color: '#661327' }} />}
                    />

                    <TextInput label={'type'} value={type} onChangeText={setType} />
                    <TextInput label={'amount'} value={amount} onChangeText={setAmount} />


                    <Button onPress={() => addIncome()}>Add income</Button>
                    <Button onPress={() => deleteIncome()} >delete Income info</Button>
                    
                </ScrollView>
            </View>
        </>
    )
}



export default Income;