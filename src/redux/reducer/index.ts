import { combineReducers } from "redux";
import podcast from "./podcastReducer"
import user from "./userReducer"
import player from "./playerReducer"



const rootReducer = combineReducers({
  podcast,
  user,
  player
});

export default rootReducer;
