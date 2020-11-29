import React, {useState, useEffect} from 'react'
import {View, Text, TextInput, StyleSheet, TouchableOpacity} from 'react-native'
import {signIn} from '../api/auth'


const SignIn = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSignIn = () => {
        signIn(email, password)
        setEmail('')
        setPassword('')
    }


    return  (
        <View style={styles.container}>
            <Text style={styles.text}>
                sign into your account
            </Text>
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
            
            <TouchableOpacity
                style={styles.button}
                onPress={() => { handleSignIn() }}
            >
                <Text style={styles.buttonText} > Sign In</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    title: {

    },
    text: {
        color: '#A95EC6',
        fontSize: '16px',
        textAlign: 'center'
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
        marginLeft: 30,
        marginRight: 30,
        paddingLeft: 16
    },
    button: {
        backgroundColor: '#3D2247',
        marginLeft: 15,
        marginRight: 15,
        marginTop: 10,
        height: 30,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: 'center'
    },
    buttonTitle: {
        color: 'white',
        fontSize: 16,
        fontWeight: "bold"
    },
    buttonText: {
        color: 'white'
    },
})


export default SignIn;

