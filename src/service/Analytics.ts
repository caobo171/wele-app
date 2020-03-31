import {firebase} from '@react-native-firebase/analytics'
import PodcastType from '@/store/podcast/types'


class Analytics {

   async playPodcast(podcast: PodcastType){
    await firebase.analytics().logEvent('play_podcast',{
        id: podcast.id,
        name: podcast.name
    })
   }

   async readHint(podcast:PodcastType){
       await firebase.analytics().logEvent('read_hint',{
           id: podcast.id,
           name: podcast.name
       })
   }

   async readDetail(podcast:PodcastType){
    await firebase.analytics().logEvent('read_detail',{
        id: podcast.id,
        name: podcast.name
    })
}

   async  trackScreenView(screen) {
    // Set & override the MainActivity screen name
    await firebase.analytics().setCurrentScreen(screen, screen);
  }

}


export default new Analytics