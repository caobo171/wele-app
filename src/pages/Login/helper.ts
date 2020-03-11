import { LoginManager, AccessToken } from "react-native-fbsdk";
import { firebase } from "@react-native-firebase/auth";
import { GoogleSignin, User } from '@react-native-community/google-signin';
import { Alert } from "react-native";

export const loginWithFacebook = async () => {

    try {
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

        try {
            const user = await firebase.auth().signInWithCredential(credential);
            return user
        } catch (err) {
            if (err.code === 'auth/account-exists-with-different-credential') {
                const user = await loginWithGoogle()
                user.user.linkWithCredential(credential)
                return user;
            } else {
                Alert.alert('Facebook Login Error', err)
                return null
            }
        }

    } catch (err) {
    }
    // const result = await LoginManager.logInWithPermissions([
    //     "public_profile",
    //     "email"
    // ]);

    // if (result.isCancelled) {
    //     throw new Error("User cancelled the login process");
    // }

    // const data = await AccessToken.getCurrentAccessToken();

    // if (!data) {
    //     throw new Error("Something went wrong obtaining access token");
    // }

    // const credential = await firebase.auth.FacebookAuthProvider.credential(
    //     data.accessToken
    // );

    // try {
    //     const user = await firebase.auth().signInWithCredential(credential);
    //     return user
    // } catch (err) {
    //     if (err.code === 'auth/account-exists-with-different-credential') {
    //         const user = await loginWithGoogle()
    //         user.user.linkWithCredential(credential)
    //         return user;
    //     } else {
    //         Alert.alert('Facebook Login Error', err)
    //         return null
    //     }
    // }
}

export const loginWithGoogle = async () => {

    try {
        await GoogleSignin.configure({
            scopes: [],
            webClientId: '703244105810-o70qus4ri8berr02vlhkaa4dvvqa62ng.apps.googleusercontent.com', // required
        });
    } catch (err) {
        Alert.alert(err)
    }


    try {
        await GoogleSignin.signIn();
    } catch (err) {
        Alert.alert(err)
    }


    try {
        const { idToken, accessToken } = await GoogleSignin.getTokens()
        const credential = await firebase.auth.GoogleAuthProvider.credential(idToken, accessToken);

        const user = await firebase.auth().signInWithCredential(credential);
        return user
    } catch (err) {
        return null
    }




    //    }catch(err){
    //        Alert.alert(err)
    //    }
}

export const validateEmail = (email: string) => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}


