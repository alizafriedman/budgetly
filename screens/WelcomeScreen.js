import React from 'react';
import {ImageBackground, StyleSheet, View, Text, TouchableOpacity} from 'react-native';


const WelcomeScreen = ({navigation}) => {

    return (
        <ImageBackground
        style={styles.background}
        source={require('../assets/background.jpg')}
        >
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

        </ImageBackground>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: "90%",
        alignItems: 'flex-end',

    },
    titleContainer: {
        flex: 2,
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
        // width: '80%',
        // height: '80%',
        height: "100%",
        width: "100%",
        justifyContent: 'center',
        resizeMode: 'cover'
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