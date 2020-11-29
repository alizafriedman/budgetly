import React, {useState, useEffect} from 'react';
import { View, Text, TextInput, Alert, ScrollView, Keyboard, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
// import { TouchableOpacity } from 'react-native-gesture-handler';
import { registration } from '../api/auth';



const SignUp = ({navigation}) => {
    const [firstName, setFirstName] = useState('')
    const[lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')


    const emptyForm = () => {
        setFirstName('')
        setLastName('')
        setEmail('')
        setPassword('')
        setConfirmPassword('')
}

    const handleRegistration = () => {
        registration(
            email,
            password,
            lastName,
            firstName
        );
        navigation.navigate('Loading');
        emptyForm();
    }

    return (
        <SafeAreaView>
            <View style={styles.container} >
                <Text style={styles.text} >
                    create an account
                </Text>
            <ScrollView
            onBlur={Keyboard.dismiss}
            >
                <TextInput
                style={styles.TextInput}
                placeholder='first name'
                value={firstName}
                onChangeText={(name) => setFirstName(name)}
                 />

                <TextInput
                    style={styles.TextInput}
                    placeholder='last name'
                    value={lastName}
                    onChangeText={(name) => setLastName(name)}
                />

                <TextInput
                    style={styles.TextInput}
                    placeholder='email '
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

                    <TextInput
                        style={styles.TextInput}
                        placeholder='confirm password'
                        value={confirmPassword}
                        onChangeText={(password2) => setConfirmPassword(password2)}
                        secureTextEntry={true}
                    />



            <TouchableOpacity
            style={styles.button}
            onPress={() => {handleRegistration}}
            >
                <Text style={styles.buttonText} > Sign Up</Text>
            </TouchableOpacity>


            <Text style={styles.text}  >
                Already have an account?
            </Text>
            <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Sign In')}
            >

            </TouchableOpacity>
            </ScrollView> 
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    title: {

    },
    logo: {
        flex: 1,
        height: 120,
        width: 90,
        alignSelf: "center",
        margin: 30
    },
    input: {
        height: 48,
        borderRadius: 5,
        overflow: 'hidden',
        backgroundColor: 'white',
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 30,
        marginRight: 30,
        paddingLeft: 16
    },
    button: {
        backgroundColor: '#788eec',
        marginLeft: 30,
        marginRight: 30,
        marginTop: 20,
        height: 48,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: 'center'
    },
    buttonTitle: {
        color: 'white',
        fontSize: 16,
        fontWeight: "bold"
    },
    footerView: {
        flex: 1,
        alignItems: "center",
        marginTop: 20
    },
    footerText: {
        fontSize: 16,
        color: '#2e2e2d'
    },
    footerLink: {
        color: "#788eec",
        fontWeight: "bold",
        fontSize: 16
    }
})


export default SignUp;
