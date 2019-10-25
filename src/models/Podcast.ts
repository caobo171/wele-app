export default interface PodcastType {
    source : string,
    imgUrl: string,
    name: string,
    narrator: string,
    postDate: Date,
    description: string,
    id: string,
    fileSize: number,
    uri?: string
}