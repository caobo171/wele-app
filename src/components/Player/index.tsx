/* eslint-disable prettier/prettier */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';

import TrackPlayer from 'react-native-track-player';

import DocumentPicker from 'react-native-document-picker';
import AsyncStorage from '@react-native-community/async-storage'

import styled from 'styled-components/native';

import ActionButtons from "./ActionButtons";
import Header from "./Header";
import Info from "./Info";
import PlayerSlider from "./Slider";
import { connect } from 'react-redux';
import PodcastType from 'src/models/Podcast';

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

interface State {
  state: number,
  position: number,
  duration: number,
  sliding: boolean,
  speed: number,
  playback: number
}

class Player extends React.Component<Props, State> {

  static navigationOptions = {
    header: null,
    tabBarVisible: false,
  };

  constructor(props: Props) {
    super(props)

    this.state = {
      position: 0,
      duration: 0,
      state: 0,
      sliding: false,
      speed: 0,
      playback: 0
    }

    
  }

  timer:any = null
  async setUpPlayer() {
    await TrackPlayer.setupPlayer()
    await TrackPlayer.updateOptions({
      stopWithApp: true,
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

  async onPlayerStateChangeHandle(event:any){
    switch (event.state) {
      case TrackPlayer.STATE_PLAYING:
      case TrackPlayer.STATE_NONE:
      case TrackPlayer.STATE_BUFFERING:
        this.setState({ state: 1 });
        break;
      default:
        this.setState({ state: 0 });
    }
  }

  async playPlayerInFirstPlace(){
    const speed = await AsyncStorage.getItem('@speed')
    const playback = await AsyncStorage.getItem('@playback')
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.audio],
      })
      try {
        // Adds a track to the queue
        await TrackPlayer.add({
          id: this.props.podcast.id,
          url: res.uri,
          title: this.props.podcast.name,
          artist: this.props.podcast.source,
          artwork: this.props.podcast.imgUrl,
        });

        // Starts playing it
        await TrackPlayer.play();

        this.setState({
          speed: speed ? Number(speed) : 1,
          playback: playback ? Number(playback) : 5
        })
      } catch (err) {
        console.log('check err', err);
      }

    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        throw err;
      }
    }
  }

  async componentDidMount() {
    TrackPlayer.addEventListener('playback-state', this.onPlayerStateChangeHandle);
    try {
      this.timer = setInterval(async () => {
        const duration = await TrackPlayer.getDuration()
        const position = await TrackPlayer.getPosition()
        if (position !== this.state.position && !this.state.sliding) {
          this.setState({ position, duration });
        }
      }, 1000);
    } catch (err) {
      console.log('check err', err);
    }
  }

  async componentWillUnmount(){
    this.timer && clearInterval(this.timer)
  }





  onPausePlayHandle = () => {
    if (this.state.state === 1) {
      TrackPlayer.pause();
    } else {
      TrackPlayer.play();
    }
  }

  onSlideCompleHandle = (value: number) => {
    TrackPlayer.seekTo(value).then(() => {
      this.setState({
        position: value,
        sliding: false
      })

    });
  };

  fastForwardHandle = async () => {
    const rate = await TrackPlayer.getRate()
    TrackPlayer.setRate(rate * this.state.speed)
  }

  fastBackwardHandle = async () => {

    const rate = await TrackPlayer.getRate()
    TrackPlayer.setRate(rate / this.state.speed)
  }

  onPlayBackHandle = () => {

    const { position, playback } = this.state
    TrackPlayer.seekTo(Math.max(0, position - playback))
  }

  onSlideStartHandle = () => {
    this.setState({ sliding: true })
  }

  render() {

    const { position, duration, state , speed, playback } = this.state
    return (
      <Wrapper>
        <Header {...this.props} />
        <StyledBodyWrapper>
          <StyledContent>
            <Info
              {...this.props.podcast}
            />
            <StyledDescriptionWrapper>
              <PlayerSlider
                duration={duration}
                position={position}
                onSlidingComplete={this.onSlideCompleHandle}
                onSlidingStart={this.onSlideStartHandle}
              />
              <ActionButtons
                openSettings={() => {
                  this.props.navigation.navigate('SettingRates')
                }}
                speed={speed}
                state={state}
                playback={playback}
                fastForwardHandle={this.fastForwardHandle}
                fastBackwardHandle={this.fastBackwardHandle}
                onPlayBackHandle={this.onPlayBackHandle}
                onPausePlayHandle={this.onPausePlayHandle}
              />
            </StyledDescriptionWrapper>

          </StyledContent>
        </StyledBodyWrapper>


      </Wrapper>
    );
  }
}


function mapStateToProps(state: any) {
  return {
    podcast: state.podcast.currentPodcast
  }
}


export default connect(mapStateToProps)(Player);

