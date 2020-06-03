/**
 * This is the code that will run tied to the player.
 *
 * The code here might keep running in the background.
 *
 * You should put everything here that should be tied to the playback but not the UI
 * such as processing media buttons or analytics
 */

import TrackPlayer from "react-native-track-player";
import storage from "@/service/localStorage";

module.exports = async function() {
	TrackPlayer.setupPlayer().then(() => {
		TrackPlayer.updateOptions({
			stopWithApp: true,
			capabilities: [
				TrackPlayer.CAPABILITY_PAUSE,
				TrackPlayer.CAPABILITY_SEEK_TO,
				TrackPlayer.CAPABILITY_STOP,
				TrackPlayer.CAPABILITY_JUMP_BACKWARD,
                TrackPlayer.CAPABILITY_JUMP_FORWARD,
                TrackPlayer.CAPABILITY_PLAY
			],
			compactCapabilities: [
				TrackPlayer.CAPABILITY_PAUSE,
				TrackPlayer.CAPABILITY_SEEK_TO,
				TrackPlayer.CAPABILITY_STOP,
				TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
				TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS,
                TrackPlayer.CAPABILITY_SET_RATING,
                TrackPlayer.CAPABILITY_PLAY
			],
		});

		TrackPlayer.addEventListener("remote-play", () => {
			TrackPlayer.play();
		});

		TrackPlayer.addEventListener("remote-pause", () => {
			TrackPlayer.pause();
		});

		TrackPlayer.addEventListener("remote-next", () => {
			TrackPlayer.skipToNext();
		});

		TrackPlayer.addEventListener("remote-previous", () => {
			TrackPlayer.skipToPrevious();
		});

		TrackPlayer.addEventListener("remote-stop", () => {
			TrackPlayer.destroy();
		});

		TrackPlayer.addEventListener("remote-jump-forward", async () => {
            const playback = await storage.get('playback', 'number', 15)
			const position = await TrackPlayer.getPosition();
			await TrackPlayer.seekTo( position + playback);
        });

        TrackPlayer.addEventListener("remote-jump-backward", async () => {
            const playback = await storage.get('playback', 'number', 15)
			const position = await TrackPlayer.getPosition();
			await TrackPlayer.seekTo(Math.max(0, position - playback));
        });
        
        
        TrackPlayer.addEventListener("remote-seek", async (value) =>{
            if(value){
                await TrackPlayer.seekTo(value);
            }
        })
	});
};
