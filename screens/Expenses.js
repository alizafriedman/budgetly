import React, {useState, useEffect} from 'react'
import {View, Appbar, FlatList, ScrollView, Text, Pressable, TouchableOpacity } from 'react-native'
import {TextInput, Button,List, Dialog, Portal} from 'react-native-paper'
import firebase from 'firebase/app'
import {db} from '../api/auth'
import NavBar from './NavBar'
import UpdateExpense from './UpdateExpense'



const Expenses = ({navigation}) => {

    const [expenses, setExpenses] = useState([])
    const[name, setName] = useState('')
    const [amount, setAmount] = useState('')
    const[category, setCategory]=useState('')
    const [recurring, setRecurring] = useState('')
    const [docId, setDocId] = useState('')
    const[loaded, setLoaded] = useState(false)
    const [updateCategory, setUpdateCategory] = useState('')
    const [visible, setVisible] = useState(false)

    const userId = firebase.auth().currentUser.uid
    const ref = db.collection(`users/${userId}/expenses`)

    useEffect(() => {
        return ref.onSnapshot((querySnapshot) => {
            const expenseList = []
            querySnapshot.forEach(doc => {
                const {category, name, amount, recurring} = doc.data()
                setDocId(doc.id)
                expenseList.push({
                    id: doc.id,
                    category,
                    name,
                    amount,
                    recurring
                })
            })
            setExpenses(expenseList)
            // setLoaded(true)
        })
    }, [])
   

    const addExpense = async (e) => {
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


    const DisplayExpenses = ({docId, name, amount, category, recurring}) => {
        return (
            <View>
                <List.AccordionGroup>

                    <List.Accordion title={`Expense Name: ${name}`} id='1'  >
                        <List.Item title={`Category: ${category}`}  />
                        <List.Item title={`Amount: $${amount}`} />
                        <List.Item title={`Recurring: ${recurring}`} />
                        <UpdateExpense docId={docId} category={category} name={name} amount={amount} recurring={recurring} setCategory={setCategory} />

                    </List.Accordion>
                </List.AccordionGroup>
            </View>
        )
    }


    return (
        <ScrollView>
                <NavBar navigation={navigation} />
                <FlatList data={expenses}
                keyExtractor={(item) => item.id }
                renderItem={({item}) => <DisplayExpenses {...item}  />}
                    />


               
                    <TextInput label={'category '} editable={true} value={category} onChangeText={setCategory} />
                    <TextInput label={'name '} value={name} onChangeText={setName} />
                    <TextInput label={'amount'} value={amount} onChangeText={setAmount} />
                    <TextInput label={'recurring'} value={recurring} onChangeText={setRecurring} />
                    
                    <Button onPress={() => addExpense()}>Add Expense</Button>
            </ScrollView>
            
    )
}


export default Expenses;