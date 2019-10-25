import { SET_CURRENT_USER, LOG_OUT , LOAD_USERS } from "../actions/userActions";
import { ActionType } from '../reduxTypes'
import  UserType  from '../../models/User'
const initState = {
  currentUser: null,
  listUsers: new Map<string,UserType>()
};

export default function user(state = initState, action: ActionType) {
  switch (action.type) {
    case LOAD_USERS:{
      return {
        ...state,
        listUsers: action.data
      }
    }
    case SET_CURRENT_USER: {
      return {
        ...state,
        currentUser: action.data
      };
    }
    case LOG_OUT: {
        return {
        ...state,
        currentUser: null
        };
    }
    default: {
      return state;
    }
  }
}
