import React, {useState, useEffect} from 'react'
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native'
import { Appbar, Icon, Drawer } from 'react-native-paper'
import firebase from 'firebase/app'
import { logOut } from '../api/auth'


const NavBar = ({navigation}) => {
    const [visible, setVisible] = useState()
    const screens = ['Home', 'Dashboard', 'Expenses', 'Income', 'Goals']

    const [active, setActive] = useState('')


   

    const handleLogOut = () => {
        logOut();
        navigation.replace('Home')
    }



    // const openMenu = () => {
    //     return (
    //         <View>
    //     <Drawer.Section title='apple' >
    //         <Drawer.Item
    //         label='banana'
    //         active={active === 'orange'}
    //         onPress={() => setActive('orange')}
    //         />

    //                 <Drawer.Item
    //                     label="Second Item"
    //                     active={active === 'second'}
    //                     onPress={() => setActive('second')}
    //                 />

    //     </Drawer.Section>
    //         </View>
    //     )
    // }

    return (
        <View style={styles.container}>

            <Appbar.Header>
                <Appbar.BackAction onPress={() => navigation.goBack()} />
                <Appbar.Action icon='menu' onPress={() => setVisible(true)} />
                <Appbar.Content title="Title" subtitle="Subtitle" />
                <Appbar.Action icon="magnify" />
                <Appbar.Action icon="dots-vertical" />
            </Appbar.Header>
{/* 
            {visible &&
                (<FlatList data={screens}
                    keyExtractor={(item) => item.id}
                    renderItem={(item) => <DisplayMenu {...item} />}
                />)} */}
                {visible && (
                <Drawer.Section title='Screens' >
                    <Drawer.Item
                        label='Dashboard'
                        onPress={() => navigation.navigate('Dashboard')}
                    />
                    <Drawer.Item
                        label='Expenses'
                        onPress={() => navigation.navigate('Expenses')}
                    />

                    <Drawer.Item
                        label='Income'
                        onPress={() => navigation.navigate('Income')}
                    />

                    <Drawer.Item
                        label='Goals'
                        onPress={() => navigation.navigate('Goals')}
                    />
                    <Drawer.Item
                        label='Log Out'
                        // onPress={() => navigation.navigate('Income')}
                    />
                  

                </Drawer.Section>
                )}
        </View>
    )



}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'flex-start'
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