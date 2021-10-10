import { RawPodcast } from "../types";

export interface NarratorType {
    displayName: string,
    id?: string,
    imgUrl?: string
}

export default interface PodcastType {
    source: string,
    imgUrl: string,
    name: string,
    narrator: NarratorType,
    downloadLink: string,
    postDate: number,
    description: string,
    id: string,
    fileSize: number,
    uri?: string,
    hint?: string,
    result?: string,
    timeListen?: number,
    order: number
}

export interface State {
    currentPodcast: null | RawPodcast,
    listPodcast: Map<string, RawPodcast>,
    recentPodcasts: Map<string, RawPodcast>,
    podcastThisWeek: Map<string, RawPodcast>,
    lastFetchDate: null | Date
}