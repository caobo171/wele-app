/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { useState } from 'react';
import {
  View, Dimensions, PanResponder, Animated
} from 'react-native';
import Player from './Player';
import PodcastType from 'src/models/Podcast';
import Hint from './Hint'

const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;
import Swiper from 'react-native-swiper'

let position = new Animated.Value(-WIDTH);
const ANIMATION_DURATION = 200
const ANIMATION_THRESHOLD = 120

interface Props {
  podcast: PodcastType
}

const AnimatedWrapper = (props: Props) => {

  const [tab, setTab] = useState<'base' | 'settings'>('base')


  let panResponder = PanResponder.create({
    onStartShouldSetPanResponder: (evt, getstureState) => true,
    onPanResponderMove: (evt, gestureState) => {


      if (gestureState.dx > 0 && tab === 'base') {
        position.setValue(gestureState.dx)
      }

      else if (gestureState.dx < 0 && tab === 'settings') {
        position.setValue(WIDTH + gestureState.dx)
      }
    },

    onPanResponderRelease: (evt, gestureState) => {
      if ((gestureState.dx > ANIMATION_THRESHOLD || gestureState.vx > 1) && tab === 'base') {
        cometoSettingsScreen()
      } else if ((-gestureState.dx > ANIMATION_THRESHOLD || -gestureState.vx > 1) && tab === 'settings') {

        comebackBaseScreen()
      } else {
        if (tab === 'base') {


          comebackBaseScreen()
        } else {
          cometoSettingsScreen()
        }
      }

    }
  })


  const basePosition = position.interpolate({
    inputRange: [0, WIDTH],
    outputRange: [WIDTH, 0]
  })



  const comebackBaseScreen = () => {
    Animated.timing(position, {
      toValue: 0
      , duration: ANIMATION_DURATION
    }).start(() => {
      setTab('base')
    })
  }

  const cometoSettingsScreen = () => {
    Animated.timing(position, {
      toValue: WIDTH
      , duration: ANIMATION_DURATION
    }).start(() => {
      setTab('settings')
    })
  }

  return (

    // <Animated.View style={{
    //   height: '100%',
    //   width: '100%',
    //   position: 'relative',
    //   backgroundColor: 'white',
    //   alignItems: 'flex-start',
    //   paddingTop: 10,
    //   paddingRight: 10,
    //   paddingBottom: 20,
    //   paddingLeft: 10
    // }}  {...panResponder.panHandlers}>
    <Swiper>
      <Player podcast={props.podcast} />
      <Hint hint={props.podcast.hint}  />

    </Swiper>

    // <Animated.ScrollView style={{
    //   position: 'absolute',
    //   // height: HEIGHT,
    //   width: WIDTH,
    //   right: basePosition,
    // }}>


    // {/*          

    //         </Animated.ScrollView>
    //       </Animated.View> */}


  )


};


export default AnimatedWrapper;