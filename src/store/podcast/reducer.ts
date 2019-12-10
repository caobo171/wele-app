import { createReducer , ActionType } from 'typesafe-actions'

import * as actions from './actions'
import PodcastType, {State } from './types'

const initialState = {
    currentPodcast: null,
    listPodcast: new Map(),
    recentPodcasts: new Map(),
    podcastThisWeek: new Map(),
    lastFetchDate: null 
}
export default createReducer<State, ActionType<typeof actions>>(initialState)
.handleAction(actions.getAllPodcasts,(state, action)=>({
    ...state,
    listPodcast: new Map([...action.payload, ...state.listPodcast])
}))
.handleAction(actions.getPodcast,(state,action)=>({
    ...state,
    currentPodcast: state.listPodcast.get(action.payload)
}))
.handleAction(actions.updateRecentPodcast,(state, action)=>{
    const newPodcast = action.payload
    let recentPodcasts = state.recentPodcasts.set(newPodcast.id, newPodcast)
    let listPodcast = state.listPodcast.set(newPodcast.id, newPodcast)
    return {
        ...state,
        recentPodcasts,
        listPodcast
    }
})
.handleAction(actions.getRecentPodcast,(state,action)=>({
    ...state,
    recentPodcasts: action.payload,
    listPodcast: new Map([ ...state.listPodcast ,...action.payload])
}))
.handleAction(actions.getPodcastThisWeek,(state,action)=>({
    ...state,
    podcastThisWeek: action.payload,
    listPodcast: new Map([...state.listPodcast, ...action.payload])
}))