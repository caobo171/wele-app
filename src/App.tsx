import React, { useCallback } from "react";
import store from "./store/store";
import { PermissionsAndroid, Alert, Platform } from 'react-native';

import {check, PERMISSIONS, RESULTS, request} from 'react-native-permissions';


import useEffectOnce from 'react-use/lib/useEffectOnce'
import SplashScreen from 'react-native-splash-screen'
//@ts-ignore
import { Provider } from "react-redux";
import NavigatorTree from "./MainWrapper";
import ThemeWrapper from "@store/theme/ThemeWrapper";


console.disableYellowBox;
const App = () => {

  const requestPermissionAndroid =  useCallback(async () => {
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
      
      } else {
        Alert.alert('Permssion Error','Folder permission denied');
      }
    } catch (err) {
      Alert.alert('Permission Error',err);
    }
  }, [])

  const requestPermissionIOS = useCallback(async ()=>{
      const res = await request(PERMISSIONS.IOS.MEDIA_LIBRARY);
  }, [])
  useEffectOnce(() => {
    Platform.OS === 'android' ? requestPermissionAndroid() : requestPermissionIOS()
    SplashScreen.hide()
  })

  return (
    <Provider store={store}>
      <ThemeWrapper>
        <NavigatorTree />
      </ThemeWrapper>
    </Provider>
  );
};

export default App;
