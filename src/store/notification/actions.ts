import { action , createAction } from 'typesafe-actions'
import NotificationType from './types'

export const getGlobalNotifications = createAction('notifications/GET_GLOBAL_NOTIFICATIONS',
(notifications: NotificationType[] , lastSeen: number)=> ({notifications, lastSeen}) )<{
    notifications:NotificationType[],
    lastSeen: number}>()


export const addNotification = createAction('notifications/ADD_NOTIFICATION')

export const updateNotifications = createAction('notifications/UPDATE_NOTIFICATIONS',()=> null)<null>()