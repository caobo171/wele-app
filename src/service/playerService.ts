import TrackPlayer from "react-native-track-player"

import DocumentPicker from "react-native-document-picker"

//@ts-ignore
import RNGRP from 'react-native-get-real-path'
import storage from "./localStorage"
import { updatePosition, updateState, updateTrack } from "@/store/player/functions"
import PodcastType from "@/store/podcast/types"
import { updateSpeed, updatePlayBack } from "@/store/player/actions"
import { updatePodcast, getPodcast } from "@/store/podcast/functions"


import RNFS from 'react-native-fs'
import { Platform } from "react-native"
import { RawPodcast } from "@/store/types"
import Constants, { PodcastSource } from "@/Constants"

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
            try {
                const positionValue = await globalPlayer.getPosition()
                if (positionValue.duration <= 0) return
                else {
                    updatePosition(positionValue.duration, positionValue.position)
                }
            } catch (err) {
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
				TrackPlayer.CAPABILITY_SET_RATING,
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
            getPodcast(Number(track.id))
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

    async addTrack(podcast: RawPodcast) {
        await TrackPlayer.add({
            id: podcast.id.toString(),
            url: encodeURI(Constants.IMAGE_URL + podcast.file_path),
            title: podcast.name,
            artist: PodcastSource.find(e => e.source_key == podcast.source_key) ? PodcastSource.find(e => e.source_key == podcast.source_key).source_name : 'Others',
            artwork: Constants.IMAGE_URL +  podcast.image_url,
            description: podcast.description,
        });

        await TrackPlayer.skip(podcast.id.toString())
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

    async pickTrack(podcast: RawPodcast) {          
        await this.addTrack(podcast)
        await TrackPlayer.play();
    }
}

const globalPlayer = new GlobalPlayer()
export default globalPlayer


