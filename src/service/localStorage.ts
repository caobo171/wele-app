import AsyncStorage from '@react-native-community/async-storage'
import PodcastType from '@/store/podcast/types';
import NotificationType from '@/store/notification/types';
import { ThemeMode } from '@/store/theme/ThemeWrapper';
import { UserType } from '@/store/user/types';

const MAX_RECENT_PODCASTS = 5;
class WeleLocalStorage {
    constructor(){

    }

    set = async (key:string, value: string)=>{
        await AsyncStorage.setItem(`@wele-${key}`, value )
    }

    removeItem = async(key:string)=>{
        return await AsyncStorage.removeItem(`@wele-${key}`)
    }

    get = async (key:string , type : string , defaultValue?:any)=>{
        const data = await AsyncStorage.getItem(`@wele-${key}`)

        if(!data){
            return defaultValue ? defaultValue: null
        } 
        switch(type){
            case 'string':{
                return data
            }
            case 'number':{
                return Number(data)
            }
            case 'object':{
                return JSON.parse(data)
            }
            default :
                return data 
        }
    }

    setPodcastList = async(podcastList : PodcastType[]) => {
        return await this.set('postcastlist',JSON.stringify(podcastList))
    }



    getPodcastList = async(): Promise<PodcastType[]>=>{
        return await this.get('postcastlist','object',[])
    }

    setRecentPodcasts = async (podcast:PodcastType, uri: string )=>{

        const podcastsStorage = await this.get('recent-podcasts', 'object', []) as PodcastType[]
        let podcasts = [...podcastsStorage]

        let savePodcast: PodcastType  = podcast 
        if(uri.indexOf('file://') !== -1){
            savePodcast.uri = uri
        }else{
            if(savePodcast.uri){
                delete savePodcast.uri
            }
        }



        const existPodcastIndex = podcasts.findIndex(e=> e.id === savePodcast.id)
        if(existPodcastIndex){
            podcasts = podcasts.splice(existPodcastIndex,1)
        }
        podcasts.push(savePodcast)

        await this.set('recent-podcasts',JSON.stringify(podcasts))
    }

    getRecentPodcasts = async ()=>{
        const podcastsStorage = await this.get('recent-podcasts', 'object', []) as PodcastType[]
        let podcasts = new Map<string, PodcastType>();
        for(let i = 0 ; i< podcastsStorage.length; i++){
            podcasts = await podcasts.set(podcastsStorage[i].id, podcastsStorage[i])
        }

        return podcasts
    }


    setNotifications = async (notifications: NotificationType[]) => {
        return await this.set('notifications',JSON.stringify(notifications))
    }

    getLastSeenNotification = async ()=>{
        let defaultDate = new Date()

        defaultDate.setDate(defaultDate.getDate() - 7 )
        const lastSeen = await this.get('lastseen-notifications','object', defaultDate)
        return new Date(lastSeen.toString())
    }


    setLastSeenNotification = async ()=>{
        return this.set('lastseen-notifications', JSON.stringify(new Date()))
    }


    saveTheme = async (theme: ThemeMode)=>{
        return await this.set('theme', theme)
    }

    getTheme = async ()=>{
        return await this.get('theme','string',ThemeMode.LIGHT)
    }


    setCurrentUser = async(user: UserType)=>{
        return await this.set('user', JSON.stringify(user))
    }

    removeCurrentUser = async()=>{
        return await this.removeItem('user')
    }

    getCurrentUser = async() : Promise<UserType | null >=>{
        const res = this.get('user','object',  null)
        return res
    }

}

const storage = new WeleLocalStorage()

export default storage