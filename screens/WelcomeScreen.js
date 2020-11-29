import React from 'react';
import {ImageBackground, StyleSheet, View, Text, TouchableOpacity} from 'react-native';
// import {TouchableOpacity} from 'react-native-gesture-handler';




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
        color:'#D2ADE0',
        fontSize: '25px',
        fontFamily: 'arial'
    },
    buttonTitle: {
        color: 'white',
        fontSize: 16,
        fontWeight: "bold"
    },
})

export default WelcomeScreen;