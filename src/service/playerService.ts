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

        console.log(  'test', TrackPlayer.CAPABILITY_PLAY);
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
            getPodcast(track.id)
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
            url: encodeURI(uri),
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
        // if (podcast.uri) {
        //     try{
        //         console.log(podcast.uri);
        //         const res =await RNFS.stat(podcast.uri.replace(/%20/g,' ' ))
        //         if(res && res.isFile()){
        //             await this.addTrack(podcast, res.path)
        //             await TrackPlayer.play()
        //             return res.path
        //         }
        //     }catch(e){
        //         console.log(e)
        //     }
        // }

        try {
            const res = await DocumentPicker.pick({
                type: [DocumentPicker.types.audio]
            })
            if (res && Number(res.size) === podcast.fileSize) {
                let correctPath = res.uri;

                if (Platform.OS === 'ios') {
                    const split = res.uri.split('/');
                    const name = split.pop();
                    const inbox = split.pop();

                    correctPath = `file://${RNFS.TemporaryDirectoryPath}${inbox}/${name}`;
                    const files = await RNFS.readDir(`${RNFS.TemporaryDirectoryPath}${inbox}`)

                    console.log(files)

                    for (let i = 0; i < files.length; i++) {
                        if (files[i].name === name.replace(/%20/g, '')) {
                            await this.addTrack(podcast, 'file://' + files[i].path)
                            await TrackPlayer.play();
                            return 'file://' + files[i].path;

                        }
                    }
                    for (let i = 0; i < files.length; i++) {
                        if (decodeURI(files[i].name) === decodeURI(name.replace(/%20/g, ' '))) {
                            if (/\s/.test(name) || /%20/.test(name)) {
                                const alterPath = `${RNFS.TemporaryDirectoryPath}${inbox}/${decodeURI(name).replace(/\s/g, '')}`
                                const alterFilePath = `file://${alterPath}`;
                                try{
                                    const res = await RNFS.moveFile(files[i].path, alterPath);
                                }catch(err){
                                    console.log(err);
                                }
                                console.log('check res', res);
                                console.log('check res' , alterFilePath)
                                await setTimeout(()=>{
                                    console.log('End TIme OUt !!')
                                }, 500)
                                await this.addTrack(podcast, alterFilePath);
                                await TrackPlayer.play();
                                return alterFilePath;
                            }
                        }
                    }

                    console.log(correctPath);

                    await this.addTrack(podcast, correctPath);
                    await TrackPlayer.play();
                    return correctPath;
                } else {

                    if (res.uri.indexOf('com.android.providers') !== -1) {
                        const stats = await RNGRP.getRealPathFromURI(res.uri)// Relative path obtained from document picker
                        var str1 = "file://";
                        var str2 = stats
                        correctPath = str1.concat(str2);
                        await this.addTrack(podcast, correctPath)
                        await TrackPlayer.play();

                        return correctPath
                    }

                }

                await this.addTrack(podcast, correctPath)
                await TrackPlayer.play();

                return true;
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


