import { useSelector } from 'react-redux'
import { State } from './types'


export const useNotifications = ()=>{
    const notifications = useSelector(
        (state : {notification: State})=> [...state.notification.unSeenNotifications, ...state.notification.seenNotifications])
    return notifications
}


export const useUnreadNotificationNumber = ()=> {
    return useSelector(
        (state : {notification: State})=> state.notification.unSeenNotifications.length)
}


