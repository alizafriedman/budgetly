import React, { useState, useEffect } from 'react'
import { View, Appbar, FlatList, ScrollView, Text, Pressable, TouchableOpacity } from 'react-native'
import { TextInput, Button, List, Dialog, Portal, Provider } from 'react-native-paper'
import firebase from 'firebase/app'
import { db } from '../api/auth'
// import NavBar from './NavBar'
import UpdateExpense from './UpdateExpense'






const DisplayExpenses = ({ docId, name, amount, category, recurring, expenseRef }) => {

    console.log('log 4', docId)
    const deleteExpense = async () => {
        console.log('log 1', docId)
        await expenseRef.doc(docId).delete()
    }

    return (
        <ScrollView>
            <List.AccordionGroup>
                <List.Accordion title={`Expense Name: ${name}`} id='1'  >
                    <List.Item title={`Category: ${category}`} />
                    <List.Item title={`Amount: $${amount}`} />
                    <List.Item title={`Recurring: ${recurring}`} />

                    <UpdateExpense docId={docId} category={category} name={name} amount={amount} recurring={recurring} expenseRef={expenseRef} />
                    <View>
                        <Button onPress={() => deleteExpense()} >delete</Button>
                    </View>
                </List.Accordion>
            </List.AccordionGroup>
        </ScrollView>
    )
}


export default DisplayExpenses;