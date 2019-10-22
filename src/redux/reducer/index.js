import { combineReducers } from "redux";
import podcast from "./podcastReducer"
import user from "./userReducer"



const rootReducer = combineReducers({
  podcast,
  user,
});

export default rootReducer;
