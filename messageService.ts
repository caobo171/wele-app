import { firebase  } from '@react-native-firebase/messaging'
import  AsyncStorage  from '@react-native-community/async-storage';


export default async (message: any) => {
    // handle your message

    return Promise.resolve();
}

firebase.messaging().setBackgroundMessageHandler(async (remoteMessage) => {
    // Update a users messages list using AsyncStorage
    const currentMessages = await AsyncStorage.getItem('messages');
    const messageArray = JSON.parse(currentMessages);
    messageArray.push(remoteMessage.data);
    await AsyncStorage.setItem('messages', JSON.stringify(messageArray));
 });