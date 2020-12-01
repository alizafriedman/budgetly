import React, {useState, useEffect} from 'react'
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native'
import { Appbar, Icon } from 'react-native-paper'
import firebase from 'firebase/app'
import { logOut } from '../api/auth'


const NavBar = ({navigation}) => {
    const [visible, setVisible] = useState(false)
    const screens = ['Home', 'Dashboard', 'Expenses', 'Income', 'Goals']

    const openMenu = () => setVisible(true)
    const closeMenu = () => setVisible(false)


   

    const handleLogOut = () => {
        logOut();
        navigation.replace('Home')
    }



    const DisplayMenu = ({ item }) => {
        return (
            <View  style={styles.listContainer} >
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.list} onPress={() => navigation.navigate(`${item}`)}>
                        {item}
                    </Text>
                    <Text onPress={handleLogOut}>
                        Log Out
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <View style={styles.container}>

            <Appbar.Header>
                <Appbar.BackAction onPress={() => navigation.goBack()} />
                <Appbar.Action icon='menu' onPress={openMenu} />
                <Appbar.Content title="Title" subtitle="Subtitle" />
                <Appbar.Action icon="magnify" />
                <Appbar.Action icon="dots-vertical" />
            </Appbar.Header>

            {visible &&
                (<FlatList data={screens}
                    keyExtractor={(item) => item.id}
                    renderItem={(item) => <DisplayMenu {...item} />}
                />)}
        </View>
    )



}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'flex-start'
    },
    listContainer: {
        backgroundColor: '#D2ADE0',
        justifyContent: "space-around",
        height: 60,
        width: 60
    },
    button: {
        backgroundColor: '#3D2247',
        // marginLeft: 15,
        // marginRight: 15,
        // marginBottom: 10,
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
    list: {
        fontSize: 16,
    }
})

export default NavBar;