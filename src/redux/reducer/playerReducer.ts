import {
    UPDATE_POSITION,
    UPDATE_STATE,
    SLIDING_PLAYER,
    UPDATE_TRACK, 
    UPDATE_SPEED,
    UPDATE_PLAYBACK
  } from "../actions/playerActions";
  import { ActionType } from "../reduxTypes";
  
  const initState = {
    state: 0 ,
    position: {
        position: 0,
        duration: 0
    },
    track: null,
    playback: 15,
    speed: 1
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
  
      case UPDATE_TRACK:{
          return {
              ...state,
              track: action.data
          }
      }

      case UPDATE_PLAYBACK:{
          return {
            ...state,
            playback: action.data
          }
      }
     
      case UPDATE_SPEED: {
          return {
            ...state,
            speed: action.data
          }
      }
      default: {
        return state;
      }
    }
  }
  