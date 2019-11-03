export default interface PodcastType {
    source : string,
    imgUrl: string,
    name: string,
    narrator: {
        displayName: string,
        id: string,
        imgUrl?: string
    },
    downloadLink: string,
    postDate: Date,
    description: string,
    id: string,
    fileSize: number,
    uri?: string
}