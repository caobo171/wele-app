import firestore from "@react-native-firebase/firestore";
export const GET_PODCAST = "GET_PODCAST";
export const LOAD_PODCASTS = "LOAD_PODCASTS";
export const SEARCH_PODCASTS = "SEARCH_PODCASTS";
export const GET_RECENT_PODCAST = "GET_RECENT_PODCAST";
export const GET_PODCASTS_THIS_WEEK = "GET_PODCASTS_THIS_WEEK";

export const PODCAST_COLLECTION = "podcasts";
export const POSTDATE_PROPERTY = "postDate";

const getStartDate = d => {
  d = new Date(d);
  const diff = d.getDate() - 7; // adjust when day is sunday
  d = new Date(d.setDate(diff));
  d = new Date(d.setHours(0));
  return d;
};


export const getPodcast = podcast => dispatch => {
  dispatch({
    type: GET_PODCAST,
    data: podcast,
  });
};

export const getPodcastThisWeek = () => async dispatch => {
  const querySnapshots = await firestore()
    .collection(PODCAST_COLLECTION)
    .orderBy(POSTDATE_PROPERTY)
    .startAt(getStartDate(new Date()))
    .get();

  let data = [];
  querySnapshots.forEach(doc => {
    data.push({ ...doc.data(), id: doc.id });
  });

  await dispatch({
    type: GET_PODCASTS_THIS_WEEK,
    data: data
  });


};
