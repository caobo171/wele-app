import {combineReducers} from 'redux'

import PlayerReducer from '@store/player/reducer'
import PodcastReducer from '@store/podcast/reducer'
import NotificationReducer from '@store/notification/reducer'
import UserReducer from '@store/user/reducer'

const appReducer = combineReducers({
    player: PlayerReducer,
    podcast: PodcastReducer,
    notification: NotificationReducer,
    user: UserReducer
})



export default appReducer;