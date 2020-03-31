import { Alert, PermissionsAndroid } from "react-native";
import VersionCheck from 'react-native-version-check';
import {Linking } from 'react-native';

export const checkUpdate = async()=>{
    const needUpdate = await VersionCheck.needUpdate()
    
    console.log(needUpdate);
    needUpdate.isNeeded && Alert.alert(
        'Application Update ',
        'A new version is available. Do you want to update now ?',
        [
          {text: 'Cancel', onPress: () => console.log('cancel'), style: 'cancel'},
          {text: 'OK', onPress: () => Linking.openURL(needUpdate.storeUrl)},
        ],
        { cancelable: true }
      )
}


export const requestPermissionAndroid =  async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      
      } else {
        Alert.alert('Permssion Error','Folder permission denied');
      }
    } catch (err) {
      Alert.alert('Permission Error',err);
    }
  }