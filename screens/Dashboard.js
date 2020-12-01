import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native'
import {Appbar, Icon} from 'react-native-paper'
import firebase from 'firebase/app'
import {logOut} from '../api/auth'
import NavBar from '../screens/NavBar'


const Dashboard = ({navigation}) => {

    const currentUserUID = firebase.auth().currentUser.uid
    const [firstName, setFirstName] = useState('');

    useEffect(() => {
        const getUserInfo = async () => {
            const doc = await firebase.firestore().collection('users').doc(currentUserUID).get()
            
            if(doc.exists) {
                const userData = doc.data();
                setFirstName(userData.firstName)
            }
        }
        getUserInfo()
    }, [])


    const viewExpenses = () => {
        navigation.navigate('Expenses')
    }

    const viewGoals = () => {
        navigation.navigate('Goals')
    }

    const viewIncome = () => {
        navigation.navigate('Income')
    }
 
    const handleLogOut = () => {
        logOut();
        navigation.replace('Home')
    }
 
    return (
     <>
        <View style={styles.container}>

            <NavBar navigation={navigation} />

            <Text style={styles.titleText} >
                dashboard
            </Text>

            <Text style={styles.text} >
                hi {firstName}
            </Text>

        <TouchableOpacity
        style={styles.button}
        onPress={handleLogOut}
        >
            <Text style={styles.buttonText} >
                log out
            </Text>
        </TouchableOpacity>
            <TouchableOpacity
                style={styles.button}
                onPress={viewExpenses}
            >
                <Text style={styles.buttonText} >
                    view expenses
            </Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.button}
                onPress={viewGoals}
            >
                <Text style={styles.buttonText} >
                    view goals
            </Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.button}
                onPress={viewIncome}
            >
                <Text style={styles.buttonText} >
                    view income
            </Text>
            </TouchableOpacity>
        </View>
        </>
    )

}

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
    text: {
        color: '#A95EC6',
        fontSize: 20,
        textAlign: 'center'
    },
    button: {
        backgroundColor: '#3D2247',
        marginLeft: 15,
        marginRight: 15,
        marginBottom: 10,
        height: 30,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: 'center',
        width: 20,
        height: 8

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