import AsyncStorage from '@react-native-community/async-storage'
import PodcastType from 'src/models/Podcast'

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

        const savePodcast: PodcastType  = {
            ...podcast,
            uri
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

}

const storage = new WeleLocalStorage()

export default storage