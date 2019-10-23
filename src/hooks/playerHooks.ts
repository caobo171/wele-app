import { EventEmitter } from "events"
import { useState , useEffect } from "react"
import useEffectOnce from "react-use/lib/useEffectOnce"

import TrackPlayer from "react-native-track-player"
import PodcastType from "src/models/Podcast"
import useAsync from "react-use/lib/useAsync"
import AsyncStorage from "@react-native-community/async-storage"
import DocumentPicker from "react-native-document-picker"
import { useDispatch, useSelector } from "react-redux"
import { getPodcast } from "../redux/actions/podcastActions"
import { UPDATE_POSITION, UPDATE_STATE, UPDATE_TRACK } from "../redux/actions/playerActions"

const event = new EventEmitter()

let interval:any = null ;


const UPDATE_POSITION_EVENT = 'update-position'
const UPDATE_STATE_EVENT = 'update-state'
const SLIDING_PLAYER = 'sliding-player'
const UPDATE_TRACK_EVENT = 'update-track'

const STATE_LIST = [
    TrackPlayer.STATE_PLAYING,
    TrackPlayer.STATE_PAUSED,
    TrackPlayer.STATE_READY,
    TrackPlayer.STATE_NONE,
    TrackPlayer.STATE_STOPPED,
    TrackPlayer.STATE_BUFFERING
]

const PLAYING_STATE = [
    TrackPlayer.STATE_PLAYING,
    TrackPlayer.STATE_BUFFERING
]

class GlobalPlayer {

    init = async ()=>{
        await TrackPlayer.setupPlayer()

        await TrackPlayer.updateOptions({
            stopWithApp: true,
            jumpInterval: 15 ,
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

    addStateListener(){
        TrackPlayer.addEventListener('playback-state', (event)=>{
            updateState(event.state)
        });
    }

    addTrackListener(){
        TrackPlayer.addEventListener('playback-track-changed', async (event)=>{
            const nextTrack = event.nextTrack
            const track = await this.getTrack(nextTrack)

            updateTrack(track)
        })
    }

    async getTrack(id:string){
        return await TrackPlayer.getTrack(id)
    }

    isPlaying(state: number){
        return PLAYING_STATE.indexOf(state) >=  0
    }

    async getPosition(){
        const position = await TrackPlayer.getPosition()
        const duration = await TrackPlayer.getDuration()

        return { position: position? position: 0 , duration: duration ? duration: 0 }
    }

    async playPause(){
        const state = await TrackPlayer.getState()
        if(state === TrackPlayer.STATE_PLAYING){
            await TrackPlayer.pause()
        }else if(state === TrackPlayer.STATE_PAUSED){
            await TrackPlayer.play()
        }
        
    }

    async pause(){
        await TrackPlayer.pause()
    }

    async addTrack( podcast: PodcastType , uri: string){
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

    async playBack(playback: number){
        const position = await TrackPlayer.getPosition()
        await TrackPlayer.seekTo(Math.max(0, position - playback))
    }

    async fastForward(speed: number){
        const rate = await TrackPlayer.getRate()
        TrackPlayer.setRate(rate * speed)
    }

    async fastBackward(speed: number){
        const rate = await TrackPlayer.getRate()
        TrackPlayer.setRate(rate / speed)
    }

    async seekTo(position: number){
        await TrackPlayer.seekTo(position)
        const newPosition = await this.getPosition()

        updatePosition(newPosition.duration,newPosition.position)
    }

    async pickTrack(podcast: PodcastType){
        try{
            const res = await  DocumentPicker.pick({
                type: [DocumentPicker.types.audio]
            })

            await this.addTrack(podcast, res.uri)

            await TrackPlayer.play()
        }catch(err){
        }
    }


}


const globalPlayer = new GlobalPlayer()
export default globalPlayer

export const updatePosition = (duration : number , position: number)=>{
    event.emit(UPDATE_POSITION_EVENT , duration , position)
}


export const updateState = (state : number)=>{
    event.emit(UPDATE_STATE_EVENT, state)
}

export const slidingPlayer = (start: boolean)=>{
    event.emit(SLIDING_PLAYER, start)
}

export const updateTrack = (track : TrackPlayer.Track)=>{
    event.emit(UPDATE_TRACK_EVENT, track)
}


export const usePlayer = ()=>{

    const player  = useSelector((state: any)=> state.player )

    const { position, track, sliding, state } = player

    const dispatch = useDispatch()

    const playback = useAsync(async()=>{
        const playbackValue = await AsyncStorage.getItem('@playback')
        return playbackValue ? playbackValue: 5
    })

    const speed = useAsync(async()=>{
        const speedValue = await AsyncStorage.getItem('@speed')
        return speedValue ? speedValue: 5
    })

    const onUpdatePositionHandler = (duration : number , position: number)=>{
        dispatch({
            type: UPDATE_POSITION,
            data: {position, duration}
        })
    }

    const onUpdateStateHandler = (value: number)=>{
        dispatch({
            type: UPDATE_STATE,
            data: value
        })
    }

    const onSlidingHandler = (start : boolean)=> {
        dispatch({
            type: SLIDING_PLAYER,
            data: start
        })
    }

    const onUpdateTrackHandler = (track: TrackPlayer.Track)=>{
        dispatch({
            type: UPDATE_TRACK,
            data: track
        })
        if(track.id){
            dispatch(getPodcast(track.id))
        }
       
    }

    const intervalHandle = async ()=>{

        if(!sliding){            
            const positionValue = await globalPlayer.getPosition()
            dispatch({
                type: UPDATE_POSITION,
                data: positionValue
            })
        }
    }

    useEffect(()=>{
        if(interval === null && !sliding){
            interval = setInterval(intervalHandle, 500)
        }

        return ()=>{
        }
        
    }, [sliding])

    useEffectOnce(()=>{

        event.on(UPDATE_POSITION_EVENT,onUpdatePositionHandler);

        event.on(UPDATE_STATE_EVENT, onUpdateStateHandler)

        event.on(SLIDING_PLAYER, onSlidingHandler)

        event.on(UPDATE_TRACK_EVENT, onUpdateTrackHandler)
        

        globalPlayer.addStateListener()

        globalPlayer.addTrackListener()

        

        return ()=>{
        }
    })

    return { state, position , playback , speed , track }
}
