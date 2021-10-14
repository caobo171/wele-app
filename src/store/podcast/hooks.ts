import { useSelector } from 'react-redux'
import { State } from './types'


export const useCurrentPodcast = ()=> {
    return useSelector((state: {podcast: State}) => (state.podcast.currentPodcast))
}

export const usePodcastList = ()=>{
    return useSelector((state: {podcast: State}) => [...state.podcast.listPodcast.values()])
}

export const usePodcastThisWeek = ()=>{
    return useSelector((state: {podcast: State}) => [...state.podcast.podcastThisWeek.values()])
}

export const useRecentPodcasts = ()=>{
    return useSelector((state: {podcast: State}) => [...state.podcast.recentPodcasts.values()])
}