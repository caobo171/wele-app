import { createAction } from "typesafe-actions"
import TrackPlayer from "react-native-track-player"
import { PositionType } from "./types"

export const updatePosition= createAction('player/UPDATE_POSITION', 
(
    position:number,
    duration:number
)=> ({duration, position}) )<PositionType>()

export const updateState = createAction('player/UPDATE_STATE', 
(state: number)=>state)<number>()

export const updateTrack = createAction('player/UPDATE_TRACK',
 (track: TrackPlayer.Track)=> (track))<TrackPlayer.Track>()

export const updateSpeed = createAction('player/UPDATE_SPEED',
(speed: number)=> speed)<number>()


export const updatePlayBack = createAction('player/UPDATE_PLAYBACK',
(playback : number)=> playback)<number>()


export const updateSliding = createAction('player/UPDATE_SLIDING',
(sliding: boolean)=> sliding)<boolean>()