/* eslint-disable prettier/prettier */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { useContext } from 'react';
import styled from 'styled-components/native';

import ActionButtons from "./ActionButtons";
import Info from "./Info";
import PlayerSlider from "./Slider";
import { connect } from 'react-redux';
import PodcastType from 'src/models/Podcast';
import globalPlayer, { usePlayer, slidingPlayer } from '../../hooks/playerHooks';
import { NavigationContext } from 'react-navigation';


const Wrapper = styled.View`
  height: 100%;
  width: 100%;
  color: yellow;
`;

const StyledBodyWrapper = styled.View`
  background-color: white;
  height: 100%;
  align-items: flex-start;
  padding: 10px 10px 10px 20px;
`;


const StyledContent = styled.View`
  width: 100%;
  margin: 0 ;
  height: 100%;
  background-color: white;
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


const Player = (props: Props) => {

    const nav = useContext(NavigationContext)
    const { state, position, playback, speed, } = usePlayer()

    const onSlideCompleHandle = async (value: number) => {
        await globalPlayer.seekTo(value)
        await slidingPlayer(false)

    }

    const onSlideStartHandle = async () => {
        await slidingPlayer(true)
    }


    const onPlayBackHandle = async () => {
        await globalPlayer.playBack(playback)
    }

    const onPausePlayHandle = () => {
        globalPlayer.playPause()
    }

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
}


export default Player

