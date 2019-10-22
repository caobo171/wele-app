import { SET_CURRENT_USER, LOG_OUT } from "../actions/userActions";

const initState = {
  currentUser: null
};

export default function user(state = initState, action) {
  switch (action.type) {
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
