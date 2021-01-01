import React, {useState, useEffect} from 'react'
import {View, Appbar, FlatList, ScrollView, Text, Pressable, TouchableOpacity } from 'react-native'
import {TextInput, Button,List, Dialog, Portal, Provider} from 'react-native-paper'
import firebase from 'firebase/app'
import {db} from '../api/auth'
import NavBar from './NavBar'
import UpdateExpense from './UpdateExpense'
import DisplayExpenses from './DisplayExpenses'

//needs styling -- wont allow ability to scroll to fill out box to add

const Expenses = ({navigation, userId}) => {

    const [expenses, setExpenses] = useState([])
    const[name, setName] = useState('')
    const [amount, setAmount] = useState('')
    const[category, setCategory]=useState('')
    const [recurring, setRecurring] = useState('')
    const [docId, setDocId] = useState('')
    // const [loading, setLoading] =useState(true)
    const [visible, setVisible] = useState(false)

    // const userId = firebase.auth().currentUser.uid
    const expenseRef = db.collection(`users/${userId}/expenses`)
    


    
    useEffect(() => {
        return expenseRef.onSnapshot((querySnapshot) => {
            const expenseList = []
            querySnapshot.forEach(doc => {
                const {category, name, amount, recurring, id} = doc.data()
                expenseList.push({
                    id: doc.id,
                    category,
                    name,
                    amount,
                    recurring
                })
                setDocId(doc.id)
            })
            setExpenses(expenseList)
        })
    }, [])
  


    // useEffect(() => {
    //    const test = async() => {
    //     const expenseList = []
    //     const expenses = await expenseRef.get()
    //     expenses.forEach(doc => {
    //         const {category, name, amount, recurring} = doc.data()
    //         setDocId(doc.id)
    //         expenseList.push({
    //             id: doc.id,
    //             category, 
    //             name, 
    //             amount, 
    //             recurring
    //         })
    //         setExpenses(expenseList)

    //     })}

    //     setLoading(false)
    //     test()
    // }, [])



    const addExpense = async (e) => {
        setVisible(false)
        await expenseRef.add({
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

  


    console.log('log 3', docId)
    // console.log(expenses.id)
    return (
        <ScrollView>
                <NavBar navigation={navigation} />
                <Button onPress={() => setVisible(true)} >add expense blah blah</Button>
                
                <FlatList 
                style={{ flex: 1}}
                data={expenses}
                keyExtractor={(item) => item.id }
                renderItem={({item}) => <DisplayExpenses {...item} docId={docId} expenseRef={expenseRef}  />}
                    />
                    

                {visible && 
                    <Provider>
                        <ScrollView>
                            <Portal>
                                <Dialog visible={visible} >
                                    <Dialog.Title>add new expense</Dialog.Title>
                                        <Dialog.Content>
                                            <TextInput label={'category '} value={category} onChangeText={setCategory} />
                                            <TextInput label={'name '} value={name} onChangeText={setName} />
                                            <TextInput label={'amount'} value={amount} onChangeText={setAmount} />
                                            <TextInput label={'recurring'} value={recurring} onChangeText={setRecurring} />
                                        </Dialog.Content>
                                         
                                         <Dialog.Actions>
                                             <Button onPress={() => addExpense()}>Add Expense</Button>
                                        </Dialog.Actions>
                                </Dialog>
                            </Portal>
                        </ScrollView>
                    </Provider>

                }   
            </ScrollView> 
    )
}


export default Expenses;