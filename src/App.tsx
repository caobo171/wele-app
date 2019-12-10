import React from "react";
import store from "./store/store";
import {PermissionsAndroid} from 'react-native';
import useEffectOnce from 'react-use/lib/useEffectOnce'
import SplashScreen from 'react-native-splash-screen'
//@ts-ignore
import { Provider } from "react-redux";
import NavigatorTree from "./MainWrapper";

import RNFS from "react-native-fs"


const App = () => {

  const requestPermission = async ()=>{
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          title: 'Wele Tool Permissions',
          message:
            'Wele Tool App needs access to your Foler ' +
            'so you can play your own playlist.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can access the folder');
      } else {
        console.log('Folder permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  }
  useEffectOnce(()=>{
    requestPermission()
    SplashScreen.hide()
  })

  return (
    <Provider store={store}>
      <NavigatorTree />
    </Provider>
  );
};

export default App;
