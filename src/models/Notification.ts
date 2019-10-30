export default interface NotificationType {

    id: string,
    imgUrl: string,
    message: string,
    sender? : string,
    time: Date,
    title: string
    type : 'weekly_podcast' | 'unknown'


}