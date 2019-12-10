export default interface NotificationType {

    id: string,
    imgUrl: string,
    message: string,
    sender? : {
        displayName: string,
        email: null,
        photoURL: string
    },
    time: Date,
    title: string
    type : 'weekly_podcast' | 'unknown'


}

export interface State {
    unSeenNotifications: NotificationType[],
    seenNotifications: NotificationType[]
}