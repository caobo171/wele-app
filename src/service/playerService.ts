import TrackPlayer from "react-native-track-player"

import DocumentPicker from "react-native-document-picker"

//@ts-ignore
import RNGRP from 'react-native-get-real-path'
import storage from "./localStorage"
import { updatePosition, updateState, updateTrack } from "@/store/player/functions"
import PodcastType from "@/store/podcast/types"
import { updateSpeed, updatePlayBack } from "@/store/player/actions"
import { updatePodcast } from "@/store/podcast/functions"


import RNFS from 'react-native-fs'

const PLAYING_STATE = [
    TrackPlayer.STATE_PLAYING,
    TrackPlayer.STATE_BUFFERING
]

class GlobalPlayer {

    init = async () => {

        const playback = await storage.get('playback', 'number', 15)
        const speed = await storage.get('speed', 'number', 1)

        updateSpeed(speed)
        updatePlayBack(playback)
        globalPlayer.addStateListener()
        globalPlayer.addTrackListener()

        const interval = setInterval(async () => {
            const positionValue = await globalPlayer.getPosition()
            if (positionValue.duration <= 0) return
            else {
                updatePosition(positionValue.duration, positionValue.position)
            }

        }, 500)


        await TrackPlayer.setupPlayer()

        await TrackPlayer.updateOptions({
            stopWithApp: true,
            jumpInterval: playback,
            capabilities: [
                TrackPlayer.CAPABILITY_PAUSE,
                TrackPlayer.CAPABILITY_SEEK_TO,
                TrackPlayer.CAPABILITY_STOP,
                TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
                TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS,
                TrackPlayer.CAPABILITY_SET_RATING,
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
    }

    get player() {
        return TrackPlayer
    }

    addStateListener() {
        TrackPlayer.addEventListener('playback-state', (event) => {
            updateState(event.state)
        });
    }

    addTrackListener() {
        TrackPlayer.addEventListener('playback-track-changed', async (event) => {
            const nextTrack = event.nextTrack
            const track = await this.getTrack(nextTrack)
            updateTrack(track)
        })
    }

    async getTrack(id: string) {
        return await TrackPlayer.getTrack(id)
    }

    isPlaying(state: number) {
        return PLAYING_STATE.indexOf(state) >= 0
    }

    async getPosition() {
        const position = await TrackPlayer.getPosition()
        const duration = await TrackPlayer.getDuration()

        return { position: position ? position : 0, duration: duration ? duration : 0 }
    }

    async playPause() {
        const state = await TrackPlayer.getState()
        if (state === TrackPlayer.STATE_PLAYING) {
            updateState(Number(TrackPlayer.STATE_PAUSED))
            await TrackPlayer.pause()
        } else if (state === TrackPlayer.STATE_PAUSED) {
            updateState(Number(TrackPlayer.STATE_PLAYING))
            await TrackPlayer.play()
        }
    }

    async pause() {
        await TrackPlayer.pause()
    }

    async addTrack(podcast: PodcastType, uri: string) {
        await TrackPlayer.add({
            id: podcast.id,
            url: uri,
            title: podcast.name,
            artist: podcast.source,
            artwork: podcast.imgUrl,
            description: podcast.description,
        })

        await updatePodcast({ ...podcast, uri })

        await TrackPlayer.skip(podcast.id)
    }

    async playBack(playback: number) {
        const position = await TrackPlayer.getPosition()
        await TrackPlayer.seekTo(Math.max(0, position - playback))
    }

    async fast(speed: number) {
        TrackPlayer.setRate(speed)
    }


    async seekTo(position: number) {
        await TrackPlayer.seekTo(position)
        const newPosition = await this.getPosition()

        updatePosition(newPosition.duration, newPosition.position)
    }

    async pickTrack(podcast: PodcastType) {

        console.log('pickTrack', podcast)
        if (podcast.uri) {
        
            try{
                const res =await RNFS.stat(podcast.uri)
                if(res && res.isFile()){
    
                    console.log('aaaaa vao day roi')
    
                    await this.addTrack(podcast, podcast.uri)
                    await TrackPlayer.play()
                    return podcast.uri
                }
            }catch(e){
                
            }
      
            
        }

        try {
            const res = await DocumentPicker.pick({
                type: [DocumentPicker.types.audio]
            })

            if (res && Number(res.size) === podcast.fileSize) {

                let correctPath = res.uri
                if (res.uri.indexOf('com.android.providers') !== -1) {
                    const stats = await RNGRP.getRealPathFromURI(res.uri)// Relative path obtained from document picker
                    var str1 = "file://";
                    var str2 = stats
                    correctPath = str1.concat(str2);
                }

                await this.addTrack(podcast, correctPath)
                await TrackPlayer.play()
                return correctPath
            } else {
                throw Error('File Size is invalid !! \n Please choose another file \n or download file again ! ')
            }
        } catch (err) {
            if (!DocumentPicker.isCancel(err)) {
                throw (err)
            } else {
                return true
            }
        }

    }
}

const globalPlayer = new GlobalPlayer()
export default globalPlayer


