import AsyncStorage from '@react-native-community/async-storage'
import NotificationType from '@/store/notification/types';
import { ThemeMode } from '@/store/theme/ThemeWrapper';
import { RawPodcast, RawUser } from '@/store/types';
import { UserType } from '@/store/user/types';

class WeleLocalStorage {
    constructor() {

    }

    set = async (key: string, value: string) => {
        await AsyncStorage.setItem(`@wele-${key}`, value)
    }

    removeItem = async (key: string) => {
        return await AsyncStorage.removeItem(`@wele-${key}`)
    }

    get = async (key: string, type: string, defaultValue?: any) => {
        const data = await AsyncStorage.getItem(`@wele-${key}`)

        if (!data) {
            return defaultValue ? defaultValue : null
        }
        switch (type) {
            case 'string': {
                return data
            }
            case 'number': {
                return Number(data)
            }
            case 'object': {
                return JSON.parse(data)
            }
            default:
                return data
        }
    }

    setPodcastList = async (podcastList: RawPodcast[]) => {
        return await this.set('postcastlist', JSON.stringify(podcastList))
    }



    getPodcastList = async (): Promise<RawPodcast[]> => {
        return await this.get('postcastlist', 'object', [])
    }

    setRecentPodcasts = async (podcast: RawPodcast) => {

        const podcastsStorage = await this.get('recent-podcasts', 'object', []) as RawPodcast[]
        let podcasts = [...podcastsStorage]

        let savePodcast: RawPodcast = podcast;

        const existPodcast = podcasts.find(e => e.id === savePodcast.id)
        if (existPodcast) {
            podcasts = podcasts.filter(e => e.id === existPodcast.id)
        }
        podcasts.unshift(savePodcast)

        await this.set('recent-podcasts', JSON.stringify(podcasts))
    }

    getRecentPodcasts = async () => {
        const podcastsStorage = await this.get('recent-podcasts', 'object', []) as RawPodcast[]
        let podcasts = new Map<number, RawPodcast>();
        for (let i = 0; i < podcastsStorage.length; i++) {
            podcasts = await podcasts.set(podcastsStorage[i].id, podcastsStorage[i])
        }

        return podcasts
    }


    setNotifications = async (notifications: NotificationType[]) => {
        return await this.set('notifications', JSON.stringify(notifications))
    }

    getLastSeenNotification = async () => {
        let defaultDate = new Date()

        defaultDate.setDate(defaultDate.getDate() - 7)
        const lastSeen = await this.get('lastseen-notifications', 'object', defaultDate)
        return new Date(lastSeen.toString())
    }


    setLastSeenNotification = async () => {
        return this.set('lastseen-notifications', JSON.stringify(new Date()))
    }


    saveTheme = async (theme: ThemeMode) => {
        return await this.set('theme', theme)
    }

    getTheme = async () => {
        return await this.get('theme', 'string', ThemeMode.LIGHT)
    }


    setCurrentUser = async (user: RawUser) => {
        return await this.set('user', JSON.stringify(user))
    }

    removeCurrentUser = async () => {
        return await this.removeItem('user')
    }

    getCurrentUser = async (): Promise<UserType | null> => {
        const res = this.get('user', 'object', null)
        return res
    }

}

const storage = new WeleLocalStorage()

export default storage