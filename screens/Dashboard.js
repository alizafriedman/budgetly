import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import firebase from 'firebase/app'
import {logOut} from '../api/auth'


const Dashboard = ({navigation}) => {
    let currentUserUID = firebase.auth().currentUser.uid
    const [firstName, setFirstName] = useState('');

    useEffect(() => {
        const getUserInfo = async () => {
            const doc = await firebase.firestore().collection('users').doc(currentUserUID).get()
            
            if(doc.exists) {
                return data = doc.data();
                setFirstName(data.firstName)
            }
        }
        getUserInfo()
    }, [])

    const handleLogOut = () => {
        logOut();
        navigation.replace('Home')
    }

    return (
        <View style={styles.container} >
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


        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'flex-end'
    },
    titleContainer: {
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'center',
        marginLeft: 300
    },
    title: {
        color: '#A95EC6',
        fontSize: '16px',
        textAlign: 'center'
    },
    background: {
        width: '100vw',
        height: '100vh',
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
        width: '20vw',
        height: '8vh'

    },
    buttonText: {
        color: '#D2ADE0',
        fontSize: '25px',
        fontFamily: 'arial'
    },
    buttonTitle: {
        color: 'white',
        fontSize: 16,
        fontWeight: "bold"
    },
})


export default Dashboard;