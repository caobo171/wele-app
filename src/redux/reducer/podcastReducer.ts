import {
  GET_PODCAST,
  GET_PODCASTS_THIS_WEEK
} from "../actions/podcastActions";
import { ActionType } from "../reduxTypes";

const initState = {
  currentPodcast: null,
  listPodcast: new Map(),
  recentPodcasts: new Map(),
  podcastThisWeek: new Map()
};

export default function podcast(state = initState, action: ActionType) {
  switch (action.type) {
    case GET_PODCAST: {
      return {
        ...state,
        currentPodcast: state.listPodcast.get(action.data),
      };
    }
    // case LOAD_PODCASTS:
    // case SEARCH_PODCASTS:
    // case GET_RECENT_PODCAST:
    case GET_PODCASTS_THIS_WEEK:
      return {
        ...state,
        podcastThisWeek: action.data,
        listPodcast: new Map([...action.data, state.listPodcast])
      }
    default: {
      return state;
    }
  }
}
