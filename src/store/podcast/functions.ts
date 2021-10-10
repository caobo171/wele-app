import NetInfo from "@react-native-community/netinfo";
import store from "../store";
import firestore from "@react-native-firebase/firestore";
import storage from "@/service/localStorage"
import * as actions from './actions'
import { RawPodcast } from "../types";
import Fetch from "@/service/Fetch";


export const PODCAST_COLLECTION = "podcasts";
export const ORDER_PROPERTY = "order";
export const getPodcast = (id: number, storex = store) => {
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
			.orderBy(ORDER_PROPERTY, 'desc')
			.limit(4)
			.get();
		let data = new Map<number, RawPodcast>();
		querySnapshots.forEach((doc: any) => {
			data = data.set(doc.id, { id: doc.id, ...doc.data(), postDate: new Date(doc.data().postDate._seconds * 1000) })
		});



		return await storex.dispatch(actions.getPodcastThisWeek(data))
	} else {
		return
	}

}

export const updatePodcast = (podcast: RawPodcast, storex = store) => {

	return storex.dispatch(actions.updatePodcast(podcast))
}


// export const updatePodcastNumber = async (podcast: RawPodcast, storex = store) => {
//   const { id, ...rest } = podcast
//   await firestore().collection(PODCAST_COLLECTION).doc(podcast.id).update({
//     ...rest
//   })

//   return storex.dispatch(actions.updatePodcast(podcast))
// }

export const getRecentPodcast = async (storex = store) => {
	const recentPodcasts = await storage.getRecentPodcasts()

	return storex.dispatch(actions.getRecentPodcast(recentPodcasts))
}


export const updateRecentPodcast = async (newPodcast: RawPodcast, storex = store) => {
	return storex.dispatch(actions.updateRecentPodcast(newPodcast))
}

export const getAllPodcasts = async (storex = store) => {

	const netState = await NetInfo.fetch()
	let data = new Map<number, RawPodcast>();

	if (netState.isConnected) {
		// const querySnapshots = await firestore()
		//   .collection(PODCAST_COLLECTION)
		//   .orderBy(ORDER_PROPERTY)
		//   .get();

		// querySnapshots.forEach(async (doc: any) => {
		//   data = data.set(doc.id, { id: doc.id, ...doc.data() })
		// });

		const res = await Fetch.postWithAccessToken<{
			podcasts: RawPodcast[]
		}>('/api/podcasts/list', {
			page_size: 10
		});

		console.log('res data', res.data.podcasts);

		if (res.status == 200) {
			for (let i = 0; i < res.data.podcasts.length; i++) {
				var podcast = res.data.podcasts[i];
				data = data.set(podcast.id, podcast);
			}
		}




		storage.setPodcastList([...data.values()])


	} else {
		const podcasts = await storage.getPodcastList()
		podcasts.forEach((podcast: RawPodcast) => {
			data = data.set(podcast.id, podcast)
		})
	}

	return storex.dispatch(actions.getAllPodcasts(data))

}

