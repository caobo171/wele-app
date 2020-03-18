import { LoginManager, AccessToken } from "react-native-fbsdk";
import { firebase } from "@react-native-firebase/auth";
import { GoogleSignin, User } from '@react-native-community/google-signin';
import { Alert } from "react-native";

import appleAuth, {
  AppleAuthRequestOperation,
  AppleAuthRequestScope,
  AppleAuthCredentialState,
  AppleAuthRealUserStatus,
  AppleAuthError,
} from '@invertase/react-native-apple-authentication';

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

}
export const loginWithApple = async () => {

  console.warn('Beginning Apple Authentication');

  try {
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: AppleAuthRequestOperation.LOGIN,
        requestedScopes: [AppleAuthRequestScope.EMAIL, AppleAuthRequestScope.FULL_NAME],
      });



      const {
        user: newUser,
        email,
        nonce,
        identityToken,
        realUserStatus /* etc */,
      } = appleAuthRequestResponse;

      const user = newUser;

      console.log(appleAuthRequestResponse)
      

      if (identityToken) {
        // e.g. sign in with Firebase Auth using `nonce` & `identityToken`
        console.log(nonce, identityToken);
        try{
          const appleCredential = await firebase.auth.AppleAuthProvider.credential(identityToken, nonce);
          const userCredential = await firebase.auth().signInWithCredential(appleCredential);
          return userCredential;
        }catch(err){
          console.log(err)
        }
  

      } else {
        // no token - failed sign-in?
        console.log("Fail to Sign in");


      }


      if (realUserStatus === AppleAuthRealUserStatus.LIKELY_REAL) {
        console.log("I'm a real person!");
      }

      console.log(`Apple Authentication Completed, ${user}, ${email}`);
    } catch (error) {
      if (error.code === AppleAuthError.CANCELED) {
        console.warn('User canceled Apple Sign in.');
      } else {
        console.error(error);
      }
    }

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
        console.log(user,'user');

        return user
    } catch (err) {
        return null
    }

}

export const validateEmail = (email: string) => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
