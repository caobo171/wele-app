/* eslint-disable prettier/prettier */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import styled from 'styled-components/native';

import ActionButtons from "./ActionButtons";
import Header from "./Header";
import Info from "./Info";
import PlayerSlider from "./Slider";
import { connect } from 'react-redux';
import PodcastType from 'src/models/Podcast';
import globalPlayer, { usePlayer, slidingPlayer } from '../../hooks/playerHooks';
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
    navigation: any,
    podcast: PodcastType
}


const Player = (props: Props) => {

    const { state, position , playback ,speed ,} = usePlayer()

    const onSlideCompleHandle = async (value:number)=>{
        await globalPlayer.seekTo(value)
        await slidingPlayer(false)

    }

    const onSlideStartHandle = async ()=>{

        console.log ('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA')
        await slidingPlayer(true)
    }

    const fastForwardHandle = async ()=> {
        await globalPlayer.fastForward(speed)
    }

    const onPlayBackHandle = async ()=>{
       await globalPlayer.playBack(playback)
    }

    const fastBackwardHandle = async()=>{
        await globalPlayer.fastBackward(speed)
    }

    const onPausePlayHandle = ()=>{
        globalPlayer.playPause()
    }

    return (
        <Wrapper>
            <Header {...props} />
            <StyledBodyWrapper>
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
                                props.navigation.navigate('SettingRates')
                            }}
                            speed={speed ? Number(speed) : 1}
                            playing ={globalPlayer.isPlaying(state)}
                            playback={playback ? Number(playback) : 5 }
                            fastForwardHandle={fastForwardHandle}
                            fastBackwardHandle={fastBackwardHandle}
                            onPlayBackHandle={onPlayBackHandle}
                            onPausePlayHandle={onPausePlayHandle}
                        />
                    </StyledDescriptionWrapper>

                </StyledContent>
            </StyledBodyWrapper>


        </Wrapper>
    );
}

Player.navigationOptions = {
    header: null
}




function mapStateToProps(state: any) {
    return {
        podcast: state.podcast.currentPodcast
    }
}


export default connect(mapStateToProps)(Player);

