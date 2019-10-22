import { firebase } from "@react-native-firebase/auth";
import UserType from "src/models/User";
export const SET_CURRENT_USER = "SET_CURRENT_USER";
export const LOAD_FRIENDS = "LOAD_FRIENDS";
export const LOAD_USERS = "LOAD_USERS";
export const LOG_OUT = "LOG_OUT";

export const setCurrentUser = (user: UserType) => (dispatch: any) => {
  dispatch({
    type: SET_CURRENT_USER,
    data: user
  });
};

export const logOut = () => async (dispatch: any) => {
  await firebase.auth().signOut();
  await dispatch({
    type: LOG_OUT
  });
};
