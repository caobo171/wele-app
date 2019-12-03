import firestore from "@react-native-firebase/firestore";
import PodcastType from "src/models/Podcast";
import storage from "../../helpers/localStorage";



export const GET_PODCAST = "GET_PODCAST";
export const LOAD_PODCASTS = "LOAD_PODCASTS";
export const SEARCH_PODCASTS = "SEARCH_PODCASTS";
export const GET_RECENT_PODCAST = "GET_RECENT_PODCAST";
export const GET_PODCASTS_THIS_WEEK = "GET_PODCASTS_THIS_WEEK";
export const UPDATE_RECENT_PODCAST = "UPDATE_PODCAST"
export const PODCAST_COLLECTION = "podcasts";
export const POSTDATE_PROPERTY = "postDate";

const getStartDate = (d: Date) => {
  d = new Date(d);
  const diff = d.getDate() - 7; // adjust when day is sunday
  d = new Date(d.setDate(diff));
  d = new Date(d.setHours(0));
  return d;
};


export const getPodcast = (id: string) => (dispatch: any) => {
  dispatch({
    type: GET_PODCAST,
    data: id,
  });
};

export const getPodcastThisWeek = () => async (dispatch: any) => {
  const querySnapshots = await firestore()
    .collection(PODCAST_COLLECTION)
    .orderBy(POSTDATE_PROPERTY)
    .startAt(getStartDate(new Date()))
    .get();

  let data = new Map<string, PodcastType>();
  querySnapshots.forEach((doc: any) => {
    data = data.set(doc.id, { id: doc.id, ...doc.data() })
  });

  await dispatch({
    type: GET_PODCASTS_THIS_WEEK,
    data: data
  });

};


export const getRecentPodcast = () => async (dispatch: any) => {
  const recentPodcasts = await storage.getRecentPodcasts()

  await dispatch({
    type: GET_RECENT_PODCAST,
    data: recentPodcasts
  })
}


export const updateRecentPodcast = (newPodcast: PodcastType) => async (dispatch: any) => {
  await dispatch({
    type: UPDATE_RECENT_PODCAST,
    data: newPodcast
  })
}


export const getPodcastList = () => async (dispatch: any) => {
  const querySnapshots = await firestore()
    .collection(PODCAST_COLLECTION)
    .get();
  

  console.log('check querySnapshot', querySnapshots)

  let data = new Map<string, PodcastType>();
  querySnapshots.forEach((doc: any) => {
    data = data.set(doc.id, { id: doc.id, ...doc.data() })
  });

  console.log('check data', data)

  await dispatch({
    type: LOAD_PODCASTS,
    data: data
  });
}