/* eslint-disable prettier/prettier */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { useState, useEffect, useCallback } from 'react';

import TrackPlayer, {
  useTrackPlayerProgress,
  usePlaybackState,
  useTrackPlayerEvents,
} from 'react-native-track-player';

import DocumentPicker from 'react-native-document-picker';
import AsyncStorage from '@react-native-community/async-storage'

import styled from 'styled-components';

import ActionButtons from "./ActionButtons";
import Header from "./Header";
import Info from "./Info";
import PlayerSlider from "./Slider";

const PODCAST = {

  key: 1,
  name: '[ESL 40063] Yelling at Children',
  description: `Pre-Beginner Course quay trở lại sau hai tuần vắng bóng rồi đây. Bài nghe thứ 4 của series, chúng ta hãy cùng nghe một đoạn trích nói về việc “YELLING AT CHILDREN” (la mắng trẻ em). Giáo dục con trẻ chưa bao giờ được xem là dễ dàng. Để giúp trẻ nghe lời, hiểu và làm những điều đúng cần rất nhiều sự kiên nhẫn và bình tĩnh từ bố mẹ và người lớn. Việc cha mẹ quát mắng con là A COMMON SITUATION (một tình huống phổ biến) ở nhiều gia đình trên thế giới. Nhiều bậc phụ huynh RAISE THEIR VOICES (lên giọng) hay quát tháo con cái họ khi họ FELL ANGRY OR AFRAID OR FRUSTRATED (cảm thấy giận dữ, sợ hãi hay chán nản). Việc la mắng con trẻ sẽ tốt khi ở mức độ vừa phải và cho trẻ con thấy việc HAVE EMOTIONS (biểu lộ cảm xúc) là hoàn toàn ổn. Nó chỉ không tốt khi khiến trẻ FEEL SHAME (cảm thấy xấu hổ).
        Đôi khi một người hét lớn lên để nói với thế giới rằng anh ấy POWERFUL AND IN CONTROL (có uy quyền và nắm quyền kiểm soát). Các bạn có tưởng tượng cảnh mình đứng trên nóc một tòa cao ốc hay trên đỉnh núi và hét lớn không? Rất thú vị phải không nào? Các mems hãy hét lên “I CAN DO IT! I CAN LEARN ENGLISH! I ENJOY LEARNING ENGLISH!” thật mạnh mẽ nhé :D.
        Các new members cùng gõ toàn bộ bài nghe vào file word rồi gửi đính kèm về weenjoylearningenglish@gmail.com với tiêu đề "ESL 40063 Tên bạn" nhé.
        Chúc cả nhà một tuần vui vẻ và tràn đầy năng lượng!`,
  source: 'Spotlight',
  narrator: 'Le Dieu Huong',
  imageUrl: 'https://scontent.fhan5-4.fna.fbcdn.net/v/t1.0-9/70250807_2865993873415542_3327755512937709568_n.jpg?_nc_cat=104&_nc_oc=AQk2O6URyALOwDThGhXMZSzIA2kDDHOGaqSBI16nXRupykDDebtyGh9A7jR_iZ5oca8&_nc_ht=scontent.fhan5-4.fna&oh=40f0a049ecbb6aacc816902c494d59c7&oe=5E20C26F',
};

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
    flex: 1;
    width: 100%;
`;

let timer = null;

class Player extends React.Component {

  static navigationOptions = {
    header: null,
    tabBarVisible: false,
  }; 

  constructor(props) {
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

  async componentDidMount() {

    const speed = await AsyncStorage.getItem('@speed')
    const playback = await AsyncStorage.getItem('@playback')
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.audio],
      })
      try {

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
          ],
          compactCapabilities: [
            TrackPlayer.CAPABILITY_PAUSE,
            TrackPlayer.CAPABILITY_SEEK_TO,
            TrackPlayer.CAPABILITY_STOP,
            TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
            TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS,
            TrackPlayer.CAPABILITY_SET_RATING,
          ],
        });

        TrackPlayer.addEventListener('playback-state', (event) => {
          switch (event.state) {
            case TrackPlayer.STATE_PLAYING:
            case TrackPlayer.STATE_NONE: 
            case TrackPlayer.STATE_BUFFERING:
              this.setState({state: 1});
              break;
            default:
              this.setState({state: 0});
          }
        });

        // Adds a track to the queue
        await TrackPlayer.add({
          id: 'trackId',
          url: res.uri,
          title: 'Track Title',
          artist: 'Track Artist',
          artwork: 'linhtinh',
        });

        // Starts playing it
        await TrackPlayer.play();

        this.setState({ 
          speed: speed ? Number(speed) : 1 , 
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

    try {
      timer = setInterval(async () => {
        const duration = await TrackPlayer.getDuration()
        const  position = await TrackPlayer.getPosition()
        if ( position !== this.state.position && !this.state.sliding) {
          this.setState({position, duration});
        }

      }, 1000);
    } catch (err) {
      console.log('check err', err);
    }
  }

  onPausePlayHandle = () => {
    if (this.state.state === 1) {
      TrackPlayer.pause();
    } else {
      TrackPlayer.play();
    }
  }

  onSlideCompleHandle = (value) => {
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

    const {position, playback} = this.state
    TrackPlayer.seekTo(Math.max(0, position - playback))
  }

  onSlideStartHandle = () => {
    this.setState({sliding: true})
  }



  render( ) {

    const {  position, duration, state, sliding, speed, playback} = this.state
    return (
      <Wrapper>
        <Header {...this.props }/>
        <StyledBodyWrapper>
          <StyledContent>
            <Info
                imageUrl = {PODCAST.imageUrl}
                source = {PODCAST.source}
                name = {PODCAST.name}
                narrator = {PODCAST.narrator}
            />
            <StyledDescriptionWrapper>
                <PlayerSlider
                    duration = { duration }
                    position = { position }
                    onSlidingComplete = { this.onSlideCompleHandle }
                    onSlidingStart = { this.onSlideStartHandle }
                />
                <ActionButtons
                    openSettings = {()=>{
                        this.props.navigation.navigate('SettingRates')
                    }}
                    speed = {speed}
                    state = { state}
                    playback = { playback }
                    fastForwardHandle = {this.fastBackwardHandle}
                    onPlayBackHandle = {this.onPlayBackHandle}
                    onPausePlayHandle = {this.onPausePlayHandle}
                />
            </StyledDescriptionWrapper>

          </StyledContent>
        </StyledBodyWrapper>


      </Wrapper>
    );
  }
}


export default Player;

