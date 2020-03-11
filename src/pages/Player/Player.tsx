/* eslint-disable prettier/prettier */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { useContext, useCallback } from 'react';
import styled from 'styled-components/native';

import ActionButtons from "./ActionButtons";
import Info from "./Info";
import PlayerSlider from "./Slider";
import globalPlayer from '../../service/playerService';
import { NavigationContext } from 'react-navigation';
import PodcastType from '@/store/podcast/types';
import { updateSliding, updatePosition } from '@/store/player/functions';
import { usePlayer } from '@/store/player/hooks';
import StatusBarView from '@/components/UI/StatusbarView';


const StyledContent = styled.View`
  width: 100%;
  margin: 0 ;
  height: 100%;
  flex-direction: column;
`;


const StyledDescriptionWrapper = styled.View`
    flex-direction: row;
    flex-wrap: wrap;
    flex: 0.8;
    width: 100%;
`;


interface Props {
    podcast: PodcastType
}


const Player = React.memo((props: Props) => {

    const nav = useContext(NavigationContext)
    const { state, position, playback, speed, } = usePlayer()

    const onSlideCompleHandle = useCallback(async (value: number) => {
        await globalPlayer.seekTo(value)
        await updateSliding(false)
        await updatePosition(position.duration,value)
    },[])

    const onSlideStartHandle = useCallback(async () => {
        await updateSliding(true)
    },[])


    const onPlayBackHandle = useCallback(async () => {
        await globalPlayer.playBack(playback)
    },[])

    const onPausePlayHandle = useCallback(() => {
        globalPlayer.playPause()
    },[])

    return (

        <StyledContent>

            <Info
                {...props.podcast}
            />
            <StyledDescriptionWrapper>
                <PlayerSlider
                    duration={position.duration}
                    position={position.position}
                    onSlidingComplete={onSlideCompleHandle}
                    onSlidingStart={onSlideStartHandle}
                />
                <ActionButtons
                    openSettings={() => {
                        nav.navigate('SettingRates')
                    }}
                    speed={speed ? Number(speed) : 1}
                    playing={globalPlayer.isPlaying(state)}
                    playback={playback ? Number(playback) : 5}
                    onPlayBackHandle={onPlayBackHandle}
                    onPausePlayHandle={onPausePlayHandle}
                />
            </StyledDescriptionWrapper>

        </StyledContent>

    );
})


export default Player

