import firestore, { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";
import PodcastType from "src/models/Podcast";
import storage from "../../helpers/localStorage";
import NotificationType from "src/models/Notification";



export const GET_GLOBAL_NOTIFICATIONS = "GET_GLOBAL_NOTIFICATIONS";
export const UPDATE_NOTIFICATIONS = 'UPDATE_NOTIFICATIONS';
export const ADD_NOTIFICATION = 'ADD_NOTIFICATION';

export const NOTIFICATION_COLLECTION = "notifications"

export const TIMESTAMP_PROPERTY = "time"


export const getGlobalNotifications = (notifications: NotificationType[]) => async (dispatch: any) => {


    await storage.setNotifications(notifications)

    const lastSeenNotification = await storage.getLastSeenNotification()

    await dispatch({
        type: GET_GLOBAL_NOTIFICATIONS,
        data: {
            notifications,
            lastSeen: lastSeenNotification
        }
    })
}


export const updateNotifications = ()=> async (dispatch: any) => {
    await storage.setLastSeenNotification() 
    await dispatch({
        type: UPDATE_NOTIFICATIONS
    })
}


