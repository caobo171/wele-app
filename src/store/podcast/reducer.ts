import { createReducer, ActionType } from 'typesafe-actions'

import * as actions from './actions'
import PodcastType, { State } from './types'

const initialState = {
    currentPodcast: null,
    listPodcast: new Map(),
    recentPodcasts: new Map(),
    podcastThisWeek: new Map(),
    lastFetchDate: null
}
export default createReducer<State, ActionType<typeof actions>>(initialState)
    .handleAction(actions.getAllPodcasts, (state, action) => {
        let listPodcast = new Map(action.payload);
        [...listPodcast.values()].forEach((podcast: PodcastType) => {

            // Check this podcast already exist 
            const existPodcast = state.listPodcast.get(podcast.id)

            // if it exist and have uri property => set uri property to new podcast
            if (existPodcast && existPodcast.uri) {
                listPodcast = listPodcast.set(podcast.id, {
                    ...podcast,
                    uri: existPodcast.uri
                })
            }
        })
        return {
            ...state,
            listPodcast: new Map([...state.listPodcast, ...listPodcast])
        }
    })
    .handleAction(actions.getPodcast, (state, action) => ({
        ...state,
        currentPodcast: state.listPodcast.get(action.payload)
    }))
    .handleAction(actions.updatePodcast, (state, action) => {
        const listPodcast = state.listPodcast.set(action.payload.id, action.payload)
        return {
            ...state,
            listPodcast
        }
    })
    .handleAction(actions.updateRecentPodcast, (state, action) => {
        const newPodcast = action.payload
        let recentPodcasts = state.recentPodcasts.set(newPodcast.id, newPodcast)
        let listPodcast = state.listPodcast.set(newPodcast.id, newPodcast)
        return {
            ...state,
            recentPodcasts,
            listPodcast
        }
    })
    .handleAction(actions.getRecentPodcast, (state, action) => { 
        let listPodcast = new Map(action.payload);
        [...listPodcast.values()].forEach((podcast: PodcastType) => {

            // Check this podcast already exist 
            const existPodcast = state.listPodcast.get(podcast.id)

            // if it exist and have uri property => set uri property to new podcast
            if (existPodcast ) {
                listPodcast = listPodcast.set(podcast.id, {
                    ...existPodcast,
                    uri: existPodcast.uri ? existPodcast.uri: null
                })
            }
        })
        return{
        ...state,
        recentPodcasts: action.payload,
        listPodcast: new Map([...state.listPodcast, ...listPodcast])
    }})
    .handleAction(actions.getPodcastThisWeek, (state, action) => {

        let listPodcast = new Map(action.payload);
        [...listPodcast.values()].forEach((podcast: PodcastType) => {

            // Check this podcast already exist 
            const existPodcast = state.listPodcast.get(podcast.id)

            // if it exist and have uri property => set uri property to new podcast
            if (existPodcast && existPodcast.uri) {
                listPodcast = listPodcast.set(podcast.id, {
                    ...podcast,
                    uri: existPodcast.uri
                })
            }
        })


        return {
            ...state,
            podcastThisWeek: action.payload,
            listPodcast: new Map([...state.listPodcast , ...listPodcast])
        }
    })