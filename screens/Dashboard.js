import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native'
import {Appbar, Icon, List, Drawer, Button} from 'react-native-paper'
import firebase from 'firebase/app'
import {logOut} from '../api/auth'
import {screens} from '../api/misc'
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
 
    console.log(screens)
    return (
        <View style={styles.container}>

            <NavBar navigation={navigation} />

            <Text style={styles.titleText} >
                dashboard 
                
            </Text>

            <Text style={styles.text} >
                hi {firstName}
            </Text>

                      {screens.map((screen) => (
                          <List.Section>
                          <List.Item
                           title={`${screen}`} 
                           onPress={() => {navigation.navigate(`${screen}`)}}
                           />
                          </List.Section>
                      ))}
        </View>
    
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