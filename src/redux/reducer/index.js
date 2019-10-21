import { combineReducers } from "redux";
import podcast from "./podcastReducer"



const rootReducer = combineReducers({
  podcast,
});

export default rootReducer;
