import { firebase  } from '@react-native-firebase/messaging'
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'
import { NOTIFICATION_COLLECTION } from '../redux/actions/notificationAction';
import NotificationType from 'src/models/Notification';
import UserType from 'src/models/User';

class MessageSystem {
    async init(getGlobalNotification: any , me: UserType){
        console.log('check init successfully !!!! ')
        const unsubscribe = await firebase.firestore().collection(NOTIFICATION_COLLECTION).onSnapshot({
            includeMetadataChanges: true
        }, (doc: any )=>{

            const notifications: NotificationType[] = doc.docs.map((e:any)=> {
                return {
                    id: e.id,
                    ...e._data,
                    time: e._data.time.toDate()
                }
            } )
            getGlobalNotification && getGlobalNotification(notifications,me)
        })

        // let unsubscribe= null;
        // const enabled = await firebase.messaging().hasPermission();
        // console.log('check enabled', enabled)
        // if(enabled){
        //     await firebase.messaging().subscribeToTopic('test');
        //     unsubscribe = firebase.messaging().onMessage((message: any)=>{
        //         console.log('check message', message)
        //     })
        // }else{
        //     try {
        //         await firebase.messaging().requestPermission();
        //         unsubscribe = firebase.messaging().onMessage((message: any)=>{
        //             console.log('check message', message)
        //         })
        //     }catch(err){
        //         Alert.alert('FAIL TO REQUEST PERMISSION !')
        //     }
        // }

        // console.log('check aaa', await AsyncStorage.getItem('messages'))

 
    }
}

const messageSystem = new MessageSystem()
export default messageSystem
