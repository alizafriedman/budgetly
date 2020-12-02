import React, {useState, useEffect} from 'react'
import {View, Text, TextInput, StyleSheet, TouchableOpacity, SafeAreaView} from 'react-native'
import {signIn} from '../api/auth'
import NavBar from './NavBar'


const SignIn = ({navigation}) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSignIn = () => {
        signIn(email, password)
        setEmail('')
        setPassword('')
    }


    return  (
        <View style={styles.container}>
        <NavBar navigation={navigation} style={styles.navBar}/>
        <View style={styles.signIn}>
            <Text style={styles.text}>
               Sign in to your account
            </Text >
            <View style={styles.inputWrapper}>
            <TextInput
                style={styles.TextInput}
                placeholder='email'
                value={email}
                onChangeText={(email) => setEmail(email)}
                keyboardType='email-address'
                autoCapitalize='none'
            />

            <TextInput
                style={styles.TextInput}
                placeholder='password'
                value={password}
                onChangeText={(password) => setPassword(password)}
                secureTextEntry={true}
            />    
            </View>
            <View style={styles.buttonWrapper}>
            <TouchableOpacity
                style={styles.button}
                onPress={() => { handleSignIn() }}
                >
                <Text style={styles.buttonText} > Sign In</Text>
            </TouchableOpacity>

            </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        aspectRatio: 1 / 2,
        alignContent: "center",
        justifyContent: "center"
    },
    navBar: {
        width: "100%"
    },
    title: {

    },
    signIn: {
        flex: 1,

    },
    inputWrapper: {
        flex: 2,
        // justifyContent: "center",
        alignItems: "center",
    },
    buttonWrapper: {
        flex: 100,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: "center"
    },
    text: {
        color: '#A95EC6',
        fontSize: 32,
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center'
    },

    TextInput: {
        height: 48,
        // border: 'none',
        // borderRadius: 5,
        // borderColor: '#3D2247',
        // overflow: 'hidden',
        backgroundColor: '#D2ADE0',
        color: '#573066',
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 40,
        marginRight: 40,
        paddingLeft: 16,
        justifyContent: "center",
        textAlign: 'center',
        width: "80%",
        borderRadius: 10
    },
    button: {
        backgroundColor: '#3D2247',
        // marginLeft: 15,
        // marginRight: 15,
        marginTop: 10,
        height: 40,
        width: "30%",
        borderRadius: 10,
        alignItems: "center",
        justifyContent: 'center'
    },
    buttonTitle: {
        color: 'white',
        fontSize: 24,
        fontWeight: "bold"
    },
    buttonText: {
        color: 'white',
        fontSize: 22
    },
})


export default SignIn;

