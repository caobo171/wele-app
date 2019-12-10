import { LoginManager, AccessToken } from "react-native-fbsdk";
import { firebase } from "@react-native-firebase/auth";

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

    const credential = firebase.auth.FacebookAuthProvider.credential(
        data.accessToken
    );

    const user = await firebase.auth().signInWithCredential(credential);

    return user
}

export const validateEmail = (email: string)=>{
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}