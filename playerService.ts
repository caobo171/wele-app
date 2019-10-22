/**
 * This is the code that will run tied to the player.
 *
 * The code here might keep running in the background.
 *
 * You should put everything here that should be tied to the playback but not the UI
 * such as processing media buttons or analytics
 */

import TrackPlayer from "react-native-track-player";

module.exports = async function() {
  TrackPlayer.setupPlayer().then(()=>{
    TrackPlayer.updateOptions({
      stopWithApp: true,
      capabilities: [
        TrackPlayer.CAPABILITY_PAUSE,
        TrackPlayer.CAPABILITY_SEEK_TO,
        TrackPlayer.CAPABILITY_STOP,
        TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
        TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS,
        TrackPlayer.CAPABILITY_SET_RATING,
      ],
      compactCapabilities: [
        TrackPlayer.CAPABILITY_PAUSE,
        TrackPlayer.CAPABILITY_SEEK_TO,
        TrackPlayer.CAPABILITY_STOP,
        TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
        TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS,
        TrackPlayer.CAPABILITY_SET_RATING,
      ],
    })

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
  })




};
