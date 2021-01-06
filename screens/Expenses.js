import React, {useState, useEffect} from 'react'
import {View, Appbar, FlatList, ScrollView, Text, Pressable, TouchableOpacity } from 'react-native'
import {TextInput, Button,List, Dialog, Portal, Provider} from 'react-native-paper'
import firebase from 'firebase/app'
import {db} from '../api/auth'
import NavBar from './NavBar'
import UpdateExpense from './UpdateExpense'
import DeleteExpense from './DeleteExpense'

//needs styling -- wont allow ability to scroll to fill out box to add

const Expenses = ({navigation}) => {

    const [expenses, setExpenses] = useState([])
    const[name, setName] = useState('')
    const [amount, setAmount] = useState('')
    const[category, setCategory]=useState('')
    const [recurring, setRecurring] = useState('')
    const [visible, setVisible] = useState(false)

    const userId = firebase.auth().currentUser.uid
    const expenseRef = db.collection(`users/${userId}/expenses`)
    
    useEffect(() => {
        return expenseRef.onSnapshot((querySnapshot) => {
            const expenseList = []
            querySnapshot.forEach(doc => {
                const {category, name, amount, recurring} = doc.data()
                expenseList.push({
                    expenseId: doc.id,
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

  
    const DisplayExpenses = ({ expenseId, name, amount, category, recurring }) => {

       
        return (
            <ScrollView>
                <List.AccordionGroup>
                    <List.Accordion title={`Expense Name: ${name}`} id='1'  >
                        <List.Item title={`Category: ${category}`} />
                        <List.Item title={`Amount: $${amount}`} />
                        <List.Item title={`Recurring: ${recurring}`} />

                        <UpdateExpense 
                        expenseId={expenseId} 
                        category={category} 
                        name={name} 
                        amount={amount} 
                        recurring={recurring} 
                        />

                        <DeleteExpense expenseId={expenseId} />

                    </List.Accordion>
                </List.AccordionGroup>
            </ScrollView>
        )
    }

    return (
        
         <View>
                <NavBar navigation={navigation} />
                <Button onPress={() => setVisible(true)} >add expense blah blah</Button>
                
                <FlatList 
                style={{ flex: 1}}
                data={expenses}
                keyExtractor={(item) => item.expenseId }
                renderItem={({item}) => <DisplayExpenses {...item}  />}
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
            </View> 
            
    )
}


export default Expenses;