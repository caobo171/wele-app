
export interface NarratorType {
    displayName: string,
    id?: string,
    imgUrl?: string
}

export default interface PodcastType {
    source : string,
    imgUrl: string,
    name: string,
    narrator: NarratorType,
    downloadLink: string,
    postDate: Date,
    description: string,
    id: string,
    fileSize: number,
    uri?: string,
    hint?: string,
    result?:string,
    timeListen?: number
}

export interface State {
    currentPodcast: null | PodcastType,
    listPodcast: Map<string, PodcastType>,
    recentPodcasts: Map<string, PodcastType>,
    podcastThisWeek: Map<string, PodcastType>,
    lastFetchDate: null | Date
}