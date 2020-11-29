import React, {useState, useEffect} from 'react'
import {View, Appbar, FlatList, ScrollView, Text } from 'react-native'
import {TextInput, Button,List} from 'react-native-paper'
import firebase from 'firebase/app'
import {db} from '../api/auth'


const Expenses = ({navigation}) => {

    const [expenses, setExpenses] = useState('')
    const[name, setName] = useState('')
    const [amount, setAmount] = useState('')
    const[category, setCategory]=useState('')
    const [recurring, setRecurring] = useState('')
    const[loading, setLoading] = useState(true)

    const userId = firebase.auth().currentUser.uid
    const ref = db.collection(`users/${userId}/expenses`)


    useEffect(() => {
        return ref.onSnapshot((querySnapshot) => {
            const expenseList = []
            querySnapshot.forEach(doc => {
                const {category, name, amount, recurring} = doc.data()
                expenseList.push({
                    id: doc.id,
                    category,
                    name,
                    amount,
                    recurring
                })
            })

            setExpenses(expenseList)
        })
    }, [])


    const addExpense = async () => {
        await ref.add({
            category: category,
            name: name,
            amount: parseInt(amount),
            recurring: recurring

        });

        setCategory('')
        setName('')
        setAmount('')
        setRecurring('')
    }


    const returnHome = () => {
        navigation.navigate('Home')
    }


    const returnDash = () => {
        navigation.navigate('Dashboard')
    }

    
            
     
    return (
        <>
            <View>
                <List.AccordionGroup>
                    <List.Accordion title={`Expense Name: ${name}`} id="1"  >
                        <List.Item title={`Category: ${category}`}  />
                    <List.Item title={`Amount: $${amount}`}  />
                    <List.Item title={`Recurring: ${recurring}`}  />
                    </List.Accordion>
                </List.AccordionGroup>
                <ScrollView>
                    <TextInput label={'category '} editable={true} value={category} onChangeText={setCategory} />
                    <TextInput label={'name '} value={name} onChangeText={setName} />
                    <TextInput label={'amount'} value={amount} onChangeText={setAmount} />
                    <TextInput label={'recurring'} value={recurring} onChangeText={setRecurring} />



                    <Button onPress={() => addExpense()}>Add Expense</Button>
                    <Button onPress={() => returnHome()}>Return Home</Button>
                    <Button onPress={() => returnDash()}>Return to Dashboard</Button>

            </ScrollView>
            </View>
        </>
    )
}


export default Expenses;