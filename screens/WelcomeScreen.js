import React from 'react';
import {Image, StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import firebase from 'firebase/app'

const WelcomeScreen = ({navigation}) => {

    return (
        <View style={styles.container}>

        <Image
        style={styles.background}
        source={require('../assets/background.jpg')}
        />
            <View style={styles.titleContainer}>
           

            <TouchableOpacity 
            style={styles.button}
            onPress={()=> {navigation.navigate('Sign Up')}}
            >
                <Text style={styles.buttonText}> Sign Up </Text>
            </TouchableOpacity>
                
                <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('Sign In')}
                >

                <Text  style={styles.buttonText} >
                    Sign In
                </Text>
                </TouchableOpacity>
            </View>
            </View>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 100,
        // height: "90%",
        alignItems: 'center',
        backgroundColor: "white"

    },
    titleContainer: {
        flex: 50,
        alignItems: 'flex-start',
        justifyContent: 'center',
        marginLeft: 20
    },
    title: {
        color: '#A95EC6',
        fontSize: 16,
        textAlign: 'center'
    },
    background: {
        height: "100%",
        width: "100%",
        justifyContent: 'center',
        resizeMode: 'cover',
        flex: 50
    },
    button: {
        backgroundColor: '#3D2247',
        marginLeft: 15,
        marginRight: 15,
        marginBottom: 10,
        minHeight: 50,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: 'center',
        minWidth: 100,
        height: 8

    },
    buttonText: {
        color:'#D2ADE0',
        fontSize: 25,
    },
    buttonTitle: {
        color: 'white',
        fontSize: 16,
        fontWeight: "bold"
    },
})

export default WelcomeScreen;