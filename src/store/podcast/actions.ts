import { action, createAction } from 'typesafe-actions'
import { RawPodcast } from '../types'



export const getPodcast = createAction('podcast/GET_PODCAST',
    (id: number) => id)<number>()

export const updatePodcast = createAction('podcast/UPDATE_PODCAST',
    (podcast: RawPodcast) => podcast)<RawPodcast>()

export const getPodcastThisWeek = createAction('podcast/GET_PODCAST_THIS_WEEK',
    (podcasts: Map<number, RawPodcast>) => podcasts)<Map<number, RawPodcast>>()


export const getRecentPodcast = createAction('podcast/GET_RECENT_PODCAST',
    (podcasts: Map<number, RawPodcast>) => podcasts)<Map<number, RawPodcast>>()

export const updateRecentPodcast = createAction('podcast/UPDATE_RECENT_PODCAST',
    (newPodcast: RawPodcast) => newPodcast)<RawPodcast>()


export const getAllPodcasts = createAction('podcast/GET_ALL_PODCASTS',
    (podcasts: Map<number, RawPodcast>) => podcasts)<Map<number, RawPodcast>>()


