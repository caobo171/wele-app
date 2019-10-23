import {
    UPDATE_POSITION,
    UPDATE_STATE,
    SLIDING_PLAYER,
    UPDATE_TRACK
  } from "../actions/playerActions";
  import { ActionType } from "../reduxTypes";
  
  const initState = {
    state: 0 ,
    position: {
        position: 0,
        duration: 0
    },
    track: null,
    sliding: false,
  };
  
  export default function podcast(state = initState, action: ActionType) {
    switch (action.type) {
      case UPDATE_POSITION: {
        return {
          ...state,
          position: action.data,
        };
      }
      case UPDATE_STATE:{
        return {
            ...state,
            state: action.data
          }
      }
   
      case SLIDING_PLAYER:{
        return {
            ...state,
            sliding: action.data
        }
      }
      case UPDATE_TRACK:{
          return {
              ...state,
              track: action.data
          }
      }
     
      default: {
        return state;
      }
    }
  }
  