import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native'
import {Appbar, Icon} from 'react-native-paper'
import firebase from 'firebase/app'
import {logOut} from '../api/auth'


const Dashboard = ({navigation}) => {

    const currentUserUID = firebase.auth().currentUser.uid
    const [firstName, setFirstName] = useState('');
    const [visible, setVisible] = useState(false)
    const screens = ['Home', 'Dashboard', 'Expenses', 'Income', 'Goals', 'Log Out' ]

    const openMenu = () => setVisible(true)
    const closeMenu = () => setVisible(false)



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
 

    const DisplayMenu = ({item}) => {
        console.log(item)
        return (
            <View>
                    <TouchableOpacity style={styles.button}>
                    <Text onPress={() => navigation.navigate(`${item}`)}>
                        {item}
                        </Text>
                    </TouchableOpacity>
            </View>
        )
    }

    return (

    <>
        <View style={styles.container}>

            <Appbar.Header>
                <Appbar.Action icon='menu' onPress={openMenu}  />
                <Appbar.Content title="Title" subtitle="Subtitle" />
                <Appbar.Action icon="magnify"  />
                <Appbar.Action icon="dots-vertical" />
            </Appbar.Header>

                {visible && 
                   ( <FlatList data={screens}
                    keyExtractor={(item) => item.id}
                    renderItem={(item) => <DisplayMenu {...item} />}
                />)}

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
        height: 100,
        alignItems: 'center'
    },
    titleContainer: {
        flex: 2,
        alignItems: 'flex-start',
        justifyContent: 'center',
        marginLeft: 300
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
    background: {
        width: "100%",
        height: "100%",
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