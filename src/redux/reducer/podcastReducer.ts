import {
  GET_PODCAST,
  GET_PODCASTS_THIS_WEEK,
  GET_RECENT_PODCAST,
  UPDATE_RECENT_PODCAST,
  LOAD_PODCASTS
} from "../actions/podcastActions";
import { ActionType } from "../reduxTypes";
import PodcastType from "src/models/Podcast";

const initState = {
  currentPodcast: null,
  listPodcast: new Map(),
  recentPodcasts: new Map(),
  podcastThisWeek: new Map()
};

export default function podcast(state = initState, action: ActionType) {
 
  switch (action.type) {
    case GET_PODCAST: {
      console.log('check action ', action)
      console.log('check listpodcast ', state.listPodcast)
      return {
        ...state,
        currentPodcast: state.listPodcast.get(action.data),
      };
    }

    case UPDATE_RECENT_PODCAST: {
      console.log('check action ', action)
      const newPodcast: PodcastType = action.data
      let recentPodcasts = state.recentPodcasts.set(newPodcast.id, newPodcast)
      let listPodcast = state.listPodcast.set(newPodcast.id, newPodcast)
      return {
        ...state,
        listPodcast,
        recentPodcasts
      }
      
    }
    // case LOAD_PODCASTS:
    // case SEARCH_PODCASTS:
    case GET_RECENT_PODCAST:{
      console.log('check action ', action)
      console.log('check listpodcast  GET_RECENT_PODCAST', state.listPodcast ,  new Map([...action.data, ...state.listPodcast]))
  
      return {
        ...state,
        recentPodcasts: action.data,
        listPodcast: new Map([ ...state.listPodcast ,...action.data])
      }
    }
    case GET_PODCASTS_THIS_WEEK:
        console.log('check action ', action)
        console.log('check listpodcast  GET_PODCASTS_THIS_WEEK', state.listPodcast, new Map([...action.data, ...state.listPodcast]))
      return {
        ...state,
        podcastThisWeek: action.data,
        listPodcast: new Map([...state.listPodcast, ...action.data])
      }

    case LOAD_PODCASTS:{
      return {
        ...state,
        listPodcast: new Map([...action.data,...state.listPodcast])
      }
    }
    default: {
      return state;
    }
  }
}
