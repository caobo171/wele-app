import NotificationType from "./types";
import storage from "@/service/localStorage";
import store from "@store/store";

import * as actions from './actions'


export const NOTIFICATION_COLLECTION = "notifications"

export const TIMESTAMP_PROPERTY = "time"
export const getGlobalNotifications = async (notifications: NotificationType[], lastSeen:number, storex= store)=>{
    await storage.setNotifications(notifications)

    return storex.dispatch(actions.getGlobalNotification(notifications , lastSeen))
}


export const updateNotifications = (storex= store)=>{
    return storex.dispatch(actions.updateNotifications())
}