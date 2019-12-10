import { Track } from "react-native-track-player";

export interface PositionType{
    position: number,
    duration: number
}

export interface State  {
    state: number ,
    position: PositionType,
    track: null | Track,
    playback: number,
    speed: number,
    sliding: boolean
}