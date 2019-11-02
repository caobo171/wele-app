import { SET_CURRENT_USER, LOG_OUT , LOAD_USERS , UPDATE_USER , LOAD_RESULTS ,
  LOAD_MY_RESULT

} from "../actions/userActions";
import { ActionType } from '../reduxTypes'
import  UserType  from '../../models/User'
import  ResultType  from '../../models/Result'
const initState = {
  currentUser: null,
  listUsers: new Map<string,UserType>(),
  listResult : new Map<string, ResultType>()
};

export default function user(state = initState, action: ActionType) {
  switch (action.type) {

    case UPDATE_USER: {
      const user: UserType = action.data
      const listUsers = state.listUsers.set(user.id, user)
      console.log('check listUsers', listUsers)
      return {
        ...state,
        listUsers
      }
    }
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
    case LOAD_RESULTS : {
      return {
        ...state,
        listResult: action.data
      } 
    }
    case LOG_OUT: {
        return {
        ...state,
        currentUser: null
        };
    }
    case LOAD_MY_RESULT : {
      if(state.currentUser){

        return {
          ...state,
          currentUser: {
            ... (state.currentUser === null ? {} : state.currentUser),
            result : action.data
          }
        }
      }
  
    }
    default: {
      return state;
    }
  }
}
