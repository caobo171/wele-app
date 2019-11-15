import { EventEmitter } from "events"
import { useState, useEffect } from "react"
import useEffectOnce from "react-use/lib/useEffectOnce"

import TrackPlayer from "react-native-track-player"
import PodcastType from "src/models/Podcast"

import DocumentPicker from "react-native-document-picker"
import { useDispatch, useSelector } from "react-redux"
import { getPodcast } from "../redux/actions/podcastActions"

//@ts-ignore
import RNGRP from 'react-native-get-real-path'
import { UPDATE_POSITION, UPDATE_STATE, UPDATE_TRACK, UPDATE_SPEED, UPDATE_PLAYBACK, SLIDING_PLAYER } from "../redux/actions/playerActions"
import storage from "../helpers/localStorage"

const event = new EventEmitter()

let interval: any = null;


const UPDATE_POSITION_EVENT = 'update-position'
const UPDATE_STATE_EVENT = 'update-state'
const SLIDING_PLAYER_EVENT = 'sliding-player-event'
const UPDATE_TRACK_EVENT = 'update-track'
const UPDATE_PLAYBACK_EVENT = "update-playback-event"
const UPDATE_SPEED_EVENT = "update-speed-event"

const PLAYING_STATE = [
    TrackPlayer.STATE_PLAYING,
    TrackPlayer.STATE_BUFFERING
]




class GlobalPlayer {

    init = async () => {

        const playback = await storage.get('playback', 'number', 15)
        const speed = await storage.get('speed', 'number', 1)

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

        await TrackPlayer.skip(podcast.id)
    }

    async playBack(playback: number) {
        const position = await TrackPlayer.getPosition()
        await TrackPlayer.seekTo(Math.max(0, position - playback))
    }

    async fastForward(speed: number) {
        const rate = await TrackPlayer.getRate()
        TrackPlayer.setRate(rate * speed)
    }

    async fastBackward(speed: number) {
        const rate = await TrackPlayer.getRate()
        TrackPlayer.setRate(rate / speed)
    }

    async seekTo(position: number) {
        await TrackPlayer.seekTo(position)
        const newPosition = await this.getPosition()

        updatePosition(newPosition.duration, newPosition.position)
    }

    async pickTrack(podcast: PodcastType) {
        if (podcast.uri) {
            console.log('check podcast uri', podcast.uri)
            await this.addTrack(podcast, podcast.uri)
            await TrackPlayer.play()
            return podcast.uri
        } else {
            try {
                const res = await DocumentPicker.pick({
                    type: [DocumentPicker.types.audio]
                })

                if (res && Number(res.size) === podcast.fileSize) {

                    let correctPath = res.uri

                    console.log('check res.uri', res.uri)
                    if (res.uri.indexOf('com.android.providers.media.documents') !== -1) {
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
}

const globalPlayer = new GlobalPlayer()
export default globalPlayer

export const updatePosition = (duration: number, position: number) => {
    event.emit(UPDATE_POSITION_EVENT, duration, position)
}


export const updateState = (state: number) => {
    event.emit(UPDATE_STATE_EVENT, state)
}

export const slidingPlayer = (start: boolean) => {

    console.log('check start', start)
    event.emit(SLIDING_PLAYER_EVENT, start)
}

export const updateTrack = (track: TrackPlayer.Track) => {
    event.emit(UPDATE_TRACK_EVENT, track)
}

export const updateSpeed = (speed: number) => {

    event.emit(UPDATE_SPEED_EVENT, speed)
}

export const updatePlayback = (playback: number) => {
    event.emit(UPDATE_PLAYBACK_EVENT, playback)
}


export const usePlayer = () => {

    const player = useSelector((state: any) => state.player)

    const { position, track, state, playback, speed } = player

    const [sliding, setSliding] = useState(false)

    const dispatch = useDispatch()

    const onUpdatePositionHandler = (duration: number, position: number) => {
        dispatch({
            type: UPDATE_POSITION,
            data: { position, duration }
        })
    }

    const onUpdateStateHandler = (value: number) => {
        dispatch({
            type: UPDATE_STATE,
            data: value
        })
    }

    const onSlidingHandler = (start: boolean) => {
        setSliding(start)
    }

    const onUpdateTrackHandler = (track: TrackPlayer.Track) => {
        dispatch({
            type: UPDATE_TRACK,
            data: track
        })
        if (track.id) {
            dispatch(getPodcast(track.id))
        }
    }

    const onUpdateSpeedHandle = (speed: number) => {
        dispatch({
            type: UPDATE_SPEED,
            data: speed
        })
    }

    const onUpdatePlaybackHandle = (playback: number) => {
        dispatch({
            type: UPDATE_PLAYBACK,
            data: playback
        })
    }


    useEffect(() => {

        if (sliding) {
            interval && clearInterval(interval)
            interval = null
        }
        if (interval === null && !sliding) {
            interval = setInterval(async () => {
                const positionValue = await globalPlayer.getPosition()
                if (positionValue.duration <= 0) return
                dispatch({
                    type: UPDATE_POSITION,
                    data: positionValue
                })
            }, 500)
        }

        return () => {
        }

    }, [sliding])

    useEffectOnce(() => {

        (async () => {
            const playback = await storage.get('playback', 'number', 15)
            const speed = await storage.get('speed', 'number', 1)
            await dispatch({
                type: UPDATE_SPEED,
                data: speed
            })
            await dispatch({
                type: UPDATE_PLAYBACK,
                data: playback
            })
        })()

        event.listenerCount(UPDATE_POSITION_EVENT) <= 0 &&
            event.on(UPDATE_POSITION_EVENT, onUpdatePositionHandler);

        event.listenerCount(UPDATE_STATE_EVENT) <= 0 &&
            event.on(UPDATE_STATE_EVENT, onUpdateStateHandler)

        event.listenerCount(SLIDING_PLAYER_EVENT) <= 0 &&
            event.on(SLIDING_PLAYER_EVENT, onSlidingHandler)

        event.listenerCount(UPDATE_TRACK_EVENT) <= 0 &&
            event.on(UPDATE_TRACK_EVENT, onUpdateTrackHandler)

        event.listenerCount(UPDATE_SPEED_EVENT) <= 0 &&
            event.on(UPDATE_SPEED_EVENT, onUpdateSpeedHandle)

        event.listenerCount(UPDATE_PLAYBACK_EVENT) <= 0 &&
            event.on(UPDATE_PLAYBACK_EVENT, onUpdatePlaybackHandle)


        globalPlayer.addStateListener()

        globalPlayer.addTrackListener()



        return () => {
            event.off(UPDATE_POSITION_EVENT, onUpdatePositionHandler);

            event.off(UPDATE_STATE_EVENT, onUpdateStateHandler)

            event.off(SLIDING_PLAYER, onSlidingHandler)

            event.off(UPDATE_TRACK_EVENT, onUpdateTrackHandler)

            event.off(UPDATE_SPEED_EVENT, onUpdateSpeedHandle)

            event.off(UPDATE_PLAYBACK_EVENT, onUpdatePlaybackHandle)
        }
    })

    return { state, position, playback, speed, track }
}
