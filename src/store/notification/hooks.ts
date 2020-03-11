import { useSelector } from 'react-redux'
import NotificationType, { State } from './types'


const sortFunction = (a:NotificationType, b:NotificationType)=>{
    return b.time.getTime() - a.time.getTime()
}
export const useNotifications = ()=>{
    const notifications = useSelector(
        (state : {notification: State})=> [...state.notification.unSeenNotifications, ...state.notification.seenNotifications].sort(sortFunction))
    return notifications
}


export const useUnreadNotificationNumber = ()=> {
    return useSelector(
        (state : {notification: State})=> state.notification.unSeenNotifications.length)
}


