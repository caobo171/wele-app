import React, {Component} from 'react';
import {View , Button} from 'react-native';
import {LoginButton, AccessToken} from 'react-native-fbsdk';

import { LoginManager } from 'react-native-fbsdk';
import {firebase} from '@react-native-firebase/auth';
 


 


export default class Login extends Component {
  render() {
    return (
      <View>
        <Button title="Login with facebook " onPress= {async ()=>{
          // Login with permissions
          const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);
          
          if (result.isCancelled) {
            throw new Error('User cancelled the login process');
          }

          const data = await AccessToken.getCurrentAccessToken();
          
          if (!data) {
            throw new Error('Something went wrong obtaining access token');
          }

          const credential = firebase.auth.FacebookAuthProvider.credential(data.accessToken);

          const data2 = await firebase.auth().signInWithCredential(credential);

          console.log('check data2', data2)
        }}/>
      </View>
    );
  }
}
