import React, {useState, useEffect} from 'react'
import {View, Appbar, FlatList, ScrollView } from 'react-native'
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
                    recurrings
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
                <ScrollView>
                    {/* <FlatList
                        style={{ flex: 1 }}
                        data={expenses}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => <ExpensesItems {...item} style={{ color: '#661327' }} />}
                    /> */}

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