import React, {useState, useEffect} from 'react'
import {View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import {Appbar, Icon, List, Drawer, Button} from 'react-native-paper';
import firebase from 'firebase/app'
import { db } from '../api/auth'

import {logOut} from '../api/auth'
import {dashScreens} from '../api/misc'
import NavBar from '../screens/NavBar'
import ExpenseGraph from './ExpenseGraph'


const Dashboard = ({navigation}) => {
    const userId = firebase.auth().currentUser.uid
    const expenseRef = db.collection(`users/${userId}/expenses`)
    const [firstName, setFirstName] = useState('')
    const [expenses, setExpenses] = useState([])

 
    useEffect(() => {
        const getUserInfo = async () => {
            const doc = await firebase.firestore().collection('users').doc(userId).get()
            const userData = doc.data()
            setFirstName(userData.fullName)
        }
        getUserInfo()
        banana()
        
    }, [])

    //   useEffect(() => {
    //     return expenseRef.onSnapshot((querySnapshot) => {
    //         const expenseList = []
    //         querySnapshot.forEach(doc => {
    //             const {category, name, amount, recurring} = doc.data()
    //             expenseList.push({
    //                 expenseId: doc.id,
    //                 category,
    //                 name,
    //                 amount,
    //                 recurring
    //             })
    //         })
    //         setExpenses(expenseList)
    //         console.log(expenseList)
    //     })
    // }, [])

    const banana = async () => {
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
            console.log(expenseList)
        })
    }
    
    
    return (
  
        <View style={styles.container}>
        <NavBar navigation={navigation} />

            <View style={styles.dashboard}>
                <Text style={styles.titleText} > dashboard </Text>
                <Text style={styles.text} > hi {firstName} </Text>
               
                <Button onPress={() => { navigation.navigate('Expenses', {expenses: expenses}) 
            }}  >Expenses</Button>
                <ExpenseGraph expenses={expenses} />

            
                    {dashScreens.map((screen, idx) => (
                        <List.Item userId={userId} title={`${screen}`} key={idx} onPress={() => {navigation.navigate(`${screen}`)}} />))}

                        <List.Item title='Log Out' 
                        onPress={() => { logOut() 
                        navigation.navigate('Home')}}/>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // height: 100,
        // width: 80,
        alignItems: 'stretch'
    },
    title: {
        color: '#A95EC6',
        fontSize: 16,
        textAlign: 'center'
    },
    titleText: {
        color: '#A95EC6',
        fontSize: 25,
        textAlign: 'center'
    },
    dashboardMenu: {
        flex: 4,
        justifyContent: 'center',
        alignItems: 'center'
    },
        text: {
        color: '#A95EC6',
        fontSize: 20,
        textAlign: 'center'
    },
    dashboard: {
        flex: 5
    },
    button: {
        backgroundColor: '#3D2247',
        color: 'white',
        marginLeft: 15,
        marginRight: 15,
        marginBottom: 10,
        height: 90,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: 'center',
        width: 1000,
        height: 25

    },
    buttonText: {
        color: '#D2ADE0',
        fontSize: 25,
    },
    buttonTitle: {
        color: 'white',
        fontSize: 16,
        fontWeight: "bold"
    },
})


export default Dashboard;