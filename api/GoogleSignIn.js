import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes
} from '@react-native-community/google-signin';
import {WEB_CLIENT_ID} from '../config/authKeys'




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


useEffect(() => {
    configureGoogleSignin();
}, [])

const configureGoogleSignin = () => {
    GoogleSignin.configure({
        webClientId: WEB_CLIENT_ID,
        offlineAccess: false
    })
}


const GoogleSignin = () => {
    const [userInfo, setUserInfo] = useState();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [error, setError] = useState();



}


export default GoogleSignin;