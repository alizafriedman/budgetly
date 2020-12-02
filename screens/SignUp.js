import React, {useState, useEffect} from 'react';
import { View, Text, TextInput, Alert, ScrollView, Keyboard, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
// import { TouchableOpacity } from 'react-native-gesture-handler';
import { registration } from '../api/auth';
import NavBar from './NavBar'



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
        navigation.navigate('Dashboard');
        emptyForm();
    }

    return (
        <SafeAreaView>
            <View style={styles.container} >
            <NavBar style={styles.navBar} navigation={navigation} />
            <ScrollView
            onBlur={Keyboard.dismiss}
            >
                <View style={styles.inputWrapper}>
                <Text style={styles.text} >
                   Create an Account
                </Text>
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

                    <TextInput
                        style={styles.TextInput}
                        placeholder='confirm password'
                        value={confirmPassword}
                        onChangeText={(password2) => setConfirmPassword(password2)}
                        secureTextEntry={true}
                    />
                </View>
             <View style={styles.test} >

        
            <TouchableOpacity
            style={styles.button}
            onPress={() => {handleRegistration()}}
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
                        <Text style={styles.buttonText} > Sign In</Text>

            </TouchableOpacity>
            </View>
            </ScrollView> 
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    navBar: {
        width: '100%',
        // justifyContent: 'center'
    },
    container: {
        // flexDirection: 'column',
        // alignItems: "stretch",
        // padding: '10%',
        aspectRatio: 1/2,
        alignContent: 'center',
        justifyContent: 'center'
    },
    title: {

    },
    inputWrapper: {
        paddingTop: 50,
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center"
    },
    text: {
        color: '#A95EC6',
        fontSize: 16,
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 10
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
        borderRadius: 10,
        alignItems: 'center',
        textAlign: 'center',
        width: "80%"

    },
    test: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: "center"
    },
    button: {
        // flexDirection:  "row",
        backgroundColor: '#3D2247',
        // marginLeft: "15%",
        // marginRight: 10,
        marginTop: 10,
        height: 40,
        width: '30%',
        borderRadius: 10,
        alignItems: "center",
        justifyContent: 'center',
        // aspectRatio: 5
    },
    buttonTitle: {
        color: 'white',
        fontSize: 24,
        fontWeight: "bold",
        alignItems: "center",
        justifyContent: "center"
    },
    buttonText: {
        color: 'white',
        fontSize: 22,
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
