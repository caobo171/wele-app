import NetInfo from "@react-native-community/netinfo";
import store from "../store";
import firestore from "@react-native-firebase/firestore";
import storage from "@/service/localStorage"
import * as actions from './actions'
import PodcastType from "./types";


export const PODCAST_COLLECTION = "podcasts";
export const POSTDATE_PROPERTY = "postDate";
export const getPodcast = (id: string, storex = store) => {
  return storex.dispatch(actions.getPodcast(id))
}

const getStartDate = (d: Date) => {
  d = new Date(d);
  const diff = d.getDate() - 7; // adjust when day is sunday
  d = new Date(d.setDate(diff));
  d = new Date(d.setHours(0));
  return d;
};


export const getPodcastThisWeek = async (storex = store) => {
  const netState = await NetInfo.fetch()

  if (netState.isConnected) {

    const querySnapshots = await firestore()
      .collection(PODCAST_COLLECTION)
      .orderBy(POSTDATE_PROPERTY)
      .startAt(getStartDate(new Date()))
      .get();

    let data = new Map<string, PodcastType>();
    querySnapshots.forEach((doc: any) => {
      data = data.set(doc.id, { id: doc.id, ...doc.data() })
    });

    return await storex.dispatch(actions.getPodcastThisWeek(data))
  }else{
    return 
  }

}

export const updatePodcast = (podcast: PodcastType, storex = store) => {

  return storex.dispatch(actions.updatePodcast(podcast))
}


export const updatePodcastNumber = async (podcast:PodcastType, storex = store) =>{
  const { id, ...rest } = podcast
  await firestore().collection(PODCAST_COLLECTION).doc(podcast.id).update({
      ...rest
  })

  return storex.dispatch(actions.updatePodcast(podcast))
}

export const getRecentPodcast = async (storex = store) => {
  const recentPodcasts = await storage.getRecentPodcasts()

  return storex.dispatch(actions.getRecentPodcast(recentPodcasts))
}


export const updateRecentPodcast = async (newPodcast: PodcastType, storex = store) => {
  return storex.dispatch(actions.updateRecentPodcast(newPodcast))
}

export const getAllPodcasts = async (storex = store) => {

  const netState = await NetInfo.fetch()
  let data = new Map<string, PodcastType>();
  if (netState.isConnected) {
    const querySnapshots = await firestore()
      .collection(PODCAST_COLLECTION)
      .orderBy(POSTDATE_PROPERTY)
      .get();


    querySnapshots.forEach((doc: any) => {
      data = data.set(doc.id, { id: doc.id, ...doc.data() })
    });

    storage.setPodcastList([...data.values()])

  } else {
    const podcasts = await storage.getPodcastList()
    podcasts.forEach((podcast: PodcastType) => {
      data = data.set(podcast.id, podcast)
    })
  }

  return storex.dispatch(actions.getAllPodcasts(data))

}

