import { ActionType, createReducer, action } from 'typesafe-actions'

import * as actions from './actions'
import NotificationType, { State } from './types'

const initialState: State = {
    unSeenNotifications: [],
    seenNotifications: []
}

export default createReducer<State, ActionType<typeof actions>>(initialState)
    .handleAction(actions.getGlobalNotification, (state, action) => {
        const notifications: NotificationType[] = action.payload.notifications;
        let defaultDate = new Date()
        defaultDate.setDate(defaultDate.getDate() - 7)
        const lastSeen: number = action.payload.lastSeen ? action.payload.lastSeen : defaultDate.getTime()
        return {
            ...state,
            unSeenNotifications: notifications.filter(e => e.time.getTime() > lastSeen),
            seenNotifications: notifications.filter(e => e.time.getTime() <= lastSeen)
        }
    })
    .handleAction(actions.updateNotifications, (state, action) => ({
        ...state,
        unSeenNotifications: [],
        seenNotifications: [...state.seenNotifications, ...state.unSeenNotifications]
    }))