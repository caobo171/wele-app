import {
    GET_GLOBAL_NOTIFICATIONS,
    UPDATE_NOTIFICATIONS,
    ADD_NOTIFICATION
} from "../actions/notificationAction";
import { ActionType } from "../reduxTypes";
import NotificationType from "src/models/Notification";

interface AppState{
    unSeenNotifications: NotificationType[],
    seenNotifications: NotificationType[]
} 

const initState: AppState = {
    unSeenNotifications: [],
    seenNotifications: [],
};

export default function notification(state = initState, action: ActionType) {

    switch (action.type) {
        case GET_GLOBAL_NOTIFICATIONS: {

            console.log('check ',action.data.notifications )
            const notifications: NotificationType[] = action.data.notifications;

            
            const lastSeen: Date = action.data.lastSeen;

         

            return {
                ...state,
                unSeenNotifications: notifications.filter(e => e.time.getTime() > lastSeen.getTime()),
                seenNotifications: notifications.filter(e => e.time.getTime() <= lastSeen.getTime())
            }
        }

        case ADD_NOTIFICATION: {
            const notification: NotificationType = action.data
            let newNotifications: NotificationType[] = state.unSeenNotifications;
            newNotifications.push(notification)
            return {
                ...state,
                unSeenNotifications: newNotifications
            }
        }

        case UPDATE_NOTIFICATIONS: {
            return {
                ...state,
                unSeenNotifications: [],
                seenNotifications: [...state.seenNotifications, ...state.unSeenNotifications]
            }
        }
        default: {
            return state;
        }
    }
}
