import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
// import {
//     GoogleSigninButton,
//     GoogleSignin
    
// } from '@react-native-community/google-signin';
import {WEB_CLIENT_ID} from '../config/authKeys'
import * as GoogleSignIn from 'expo-google-sign-in'




// GoogleSignin.configure(
//     {
//         scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
//         webClientId: WEB_CLIENT_ID, // client ID of type WEB for your server (needed to verify user ID and offline access)
//         offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
//         hostedDomain: '', // specifies a hosted domain restriction
//         loginHint: '', // [iOS] The user's ID, or email address, to be prefilled in the authentication UI if possible. [See docs here](https://developers.google.com/identity/sign-in/ios/api/interface_g_i_d_sign_in.html#a0a68c7504c31ab0b728432565f6e33fd)
//         forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
//         accountName: '', // [Android] specifies an account name on the device that should be used
//     }
// )


// useEffect(() => {
//     configureGoogleSignin();
// }, [])

const configureGoogleSignin = () => {
    GoogleSignin.configure({
        webClientId: WEB_CLIENT_ID,
        offlineAccess: false
    })
}


const GoogleAuth = () => {
    const [userInfo, setUserInfo] = useState();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [error, setError] = useState();

    const signIn = async() => {
        await GoogleSignin.hasPlayServices();
        const userInfo = await GoogleSignIn.initAsync();
        // if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        //     return 'apple'
        //     // user cancelled the login flow
        // } else if (error.code === statusCodes.IN_PROGRESS) {
        //     return 'orange'
        //     // operation (e.g. sign in) is in progress already
        // } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        //     return 'banana'
        //     // play services not available or outdated
        // } else {
        setUserInfo(userInfo);
        setError(null);
        setIsLoggedIn(true);
        
    }

    const signOut = async() => {
        await GoogleSignin.revokeAccess();
        await GoogleSignin.signOut();
        setIsLoggedIn(false);
        }

    const getCurrentUserInfo = async () => {
        const userInfo = await GoogleSignin.signInSilently();
        setUserInfo(userInfo);
        setIsLoggedIn(false);
    }
        
    return (
       <View style={styles.container}>

            <GoogleSigninButton 
                style={styles.signInButton}
                size={GoogleSigninButton.Size.Wide}
                color={GoogleSigninButton.Color.Dark}
                // style={{ width: 192, height: 48 }}
                onPress={() => signIn()}
                disabled={this.state.isSigninInProgress}
            />
       </View>
    )

}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    signInButton: {
        width: 200,
        height: 50
    }
})

export default GoogleAuth;