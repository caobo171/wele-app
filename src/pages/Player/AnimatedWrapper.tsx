/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import Player from './Player';
import PodcastType from '@store/podcast/types';
import Hint from './Hint'

import Swiper from 'react-native-swiper'

interface Props {
  podcast: PodcastType
}

const AnimatedWrapper = (props: Props) => {
  
  return (
    <React.Fragment>
      {
        (!props.podcast.hint || props.podcast.hint.replace(/\s/g, '') === '') ?
          <Player podcast={props.podcast} /> :
          <Swiper>
            <Player podcast={props.podcast} />
            <Hint hint={props.podcast.hint} />
          </Swiper>
      }
    </React.Fragment>

  )
};


export default AnimatedWrapper;