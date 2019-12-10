import { action, createAction } from 'typesafe-actions'
import PodcastType from './types'


export const getPodcast = createAction('podcast/GET_PODCAST',
(id:string)=> id)<string>()


export const getPodcastThisWeek =  createAction('podcast/GET_PODCAST_THIS_WEEK',
(podcasts: Map<string,PodcastType>)=> podcasts )<Map<string,PodcastType>>()


export const getRecentPodcast = createAction('podcast/GET_RECENT_PODCAST',
(podcasts: Map<string,PodcastType>)=> podcasts )<Map<string,PodcastType>>()

export const updateRecentPodcast = createAction('podcast/UPDATE_RECENT_PODCAST',
(newPodcast: PodcastType)=> newPodcast)<PodcastType>()


export const getAllPodcasts = createAction('podcast/GET_ALL_PODCASTS',
(podcasts: Map<string,PodcastType>)=> podcasts )<Map<string,PodcastType>>()


