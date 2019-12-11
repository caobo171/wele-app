import { LoginManager, AccessToken } from "react-native-fbsdk";
import { firebase } from "@react-native-firebase/auth";
import { GoogleSignin, User } from '@react-native-community/google-signin';

export const loginWithFacebook = async () => {

    const result = await LoginManager.logInWithPermissions([
        "public_profile",
        "email"
    ]);

    if (result.isCancelled) {
        throw new Error("User cancelled the login process");
    }

    const data = await AccessToken.getCurrentAccessToken();

    if (!data) {
        throw new Error("Something went wrong obtaining access token");
    }

    const credential = await firebase.auth.FacebookAuthProvider.credential(
        data.accessToken
    );

    const user = await firebase.auth().signInWithCredential(credential);

    return user
}

export const loginWithGoogle = async () => {

    await GoogleSignin.configure({
        scopes: [],
        webClientId: '703244105810-o70qus4ri8berr02vlhkaa4dvvqa62ng.apps.googleusercontent.com', // required
    });
    const googleUser = await GoogleSignin.signIn();
    console.log('1' , googleUser)
    const {idToken, accessToken} = await GoogleSignin.getTokens()
    console.log('2')
    const credential = await firebase.auth.GoogleAuthProvider.credential(idToken, accessToken);
    console.log('3')
    const user  = await firebase.auth().signInWithCredential(credential);
    console.log('4')
    console.log('check user', user)
    return user
}

export const validateEmail = (email: string) => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}


