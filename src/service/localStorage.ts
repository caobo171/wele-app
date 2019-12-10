import AsyncStorage from '@react-native-community/async-storage'
import PodcastType from '@/store/podcast/types';
import NotificationType from '@/store/notification/types';

const MAX_RECENT_PODCASTS = 5;
class WeleLocalStorage {
    constructor(){

    }

    set = async (key:string, value: string)=>{
        await AsyncStorage.setItem(`@wele-${key}`, value )
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

        if(podcasts.length > MAX_RECENT_PODCASTS) {
            podcasts.shift()
        }

        await this.set('recent-podcasts',JSON.stringify(podcasts))
    }

    getRecentPodcasts = async ()=>{
        const podcastsStorage = await this.get('recent-podcasts', 'object', []) as PodcastType[]
        console.log('check podcastStorage', podcastsStorage)
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
        console.log('check lasseettn', lastSeen , new Date(lastSeen.toString()))
        return new Date(lastSeen.toString())
    }


    setLastSeenNotification = async ()=>{
        return this.set('lastseen-notifications', JSON.stringify(new Date()))
    }


}

const storage = new WeleLocalStorage()

export default storage