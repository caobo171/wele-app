import { combineReducers } from "redux";
import podcast from "./podcastReducer"
import user from "./userReducer"
import player from "./playerReducer"
import notification from "./notificationReducer"


const rootReducer = combineReducers({
  podcast,
  user,
  player,
  notification
});

export default rootReducer;
