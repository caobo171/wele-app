import { PLAY, PAUSE } from "../actions/player";

const initialState = {
  playback: 5,
  speed: 1,
  status: 0,
  currentPodcast: null
};

export default function player(state = initialState, action) {
  switch (action.type) {
    case PLAY: {
      return {
        ...state,
        status: action.payload.currentPodcast
      };
    }
    default: {
      return state;
    }
  }
}
