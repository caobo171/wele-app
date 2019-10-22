import { firebase } from "@react-native-firebase/auth";
export const SET_CURRENT_USER = "SET_CURRENT_USER";
export const LOAD_FRIENDS = "LOAD_FRIENDS";
export const LOAD_USERS = "LOAD_USERS";
export const LOG_OUT = "LOG_OUT";

export const setCurrentUser = user => dispatch => {
  dispatch({
    type: SET_CURRENT_USER,
    data: user
  });
};

export const logOut = () => async dispatch => {
  await firebase.auth().signOut();
  await dispatch({
    type: LOG_OUT
  });
};
