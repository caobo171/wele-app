import firestore, { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";
import auth , {firebase} from "@react-native-firebase/auth";
import PodcastType from "src/models/Podcast";
import storage from "../../helpers/localStorage";
import NotificationType from "src/models/Notification";
import UserType from "src/models/User";



export const GET_GLOBAL_NOTIFICATIONS = "GET_GLOBAL_NOTIFICATIONS";
export const UPDATE_NOTIFICATIONS = 'UPDATE_NOTIFICATIONS';
export const ADD_NOTIFICATION = 'ADD_NOTIFICATION';

export const NOTIFICATION_COLLECTION = "notifications"

export const TIMESTAMP_PROPERTY = "time"


const setLastSeenNotification = (me: UserType)=>{
    firebase.database().ref(`/users/${me.id}/lastSeen`).set( (new Date()).getTime())
}


export const getGlobalNotifications = (notifications: NotificationType[], me: UserType) => async (dispatch: any) => {


    await storage.setNotifications(notifications)

    setLastSeenNotification(me)

    const lastSeenNotification  = me.lastSeen

    await dispatch({
        type: GET_GLOBAL_NOTIFICATIONS,
        data: {
            notifications,
            lastSeen: lastSeenNotification ? new Date(lastSeenNotification) : null
        }
    })
}


export const updateNotifications = (me: UserType)=> async (dispatch: any) => {
    await setLastSeenNotification(me)
    await dispatch({
        type: UPDATE_NOTIFICATIONS
    })
}


