import {
  GET_PODCAST,
  LOAD_PODCASTS,
  SEARCH_PODCASTS,
  GET_RECENT_PODCAST,
  GET_PODCASTS_THIS_WEEK
} from "../actions/podcastActions";

const initState = {
  currentPodcast: null,
  listPodcast: new Map(),
  recentPodcasts: [],
  podcastThisWeek: []
};

export default function podcast(state = initState, action) {
  switch (action.type) {
    case GET_PODCAST: {
      return {
        ...state,
        currentPodcast: action.data,
      };
    }
    // case LOAD_PODCASTS:
    // case SEARCH_PODCASTS:
    // case GET_RECENT_PODCAST:
    case GET_PODCASTS_THIS_WEEK:
      return {
        ...state,
        podcastThisWeek: action.data,
      }
    default: {
      return state;
    }
  }
}
