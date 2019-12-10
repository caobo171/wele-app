import { firebase  } from '@react-native-firebase/messaging'
import { NOTIFICATION_COLLECTION } from '@store/notification/functions';
import { UserType } from '@/store/user/types';
import NotificationType from '@/store/notification/types';
import { getGlobalNotification } from '@/store/notification/actions';
import storage from './localStorage';


class MessageSystem {
    async init(me: UserType){
        console.log('check init successfully !!!! ')
        const unsubscribe = await firebase.firestore().collection(NOTIFICATION_COLLECTION).onSnapshot({
            includeMetadataChanges: true
        }, async (doc: any )=>{

            const notifications: NotificationType[] = doc.docs.map((e:any)=> {
                return {
                    id: e.id,
                    ...e._data,
                    time: e._data.time.toDate()
                }
            } )

            // save noti in local 
            await storage.setNotifications(notifications)
            const lastSeen = me.lastSeen

            // update noti in redux store
            getGlobalNotification(notifications , lastSeen)
        })
 
    }
}

const messageSystem = new MessageSystem()
export default messageSystem
