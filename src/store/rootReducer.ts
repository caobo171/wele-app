import {combineReducers} from 'redux'

import PlayerReducer from '@store/player/reducer'
import PodcastReducer from '@store/podcast/reducer'
import NotificationReducer from '@store/notification/reducer'
import UserReducer from '@store/user/reducer'
import ThemeReducer from '@store/theme/reducer'

const appReducer = combineReducers({
    player: PlayerReducer,
    podcast: PodcastReducer,
    notification: NotificationReducer,
    user: UserReducer,
    theme: ThemeReducer
})



export default appReducer;