/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { useMemo } from 'react';
import Player from './Player';
import PodcastType from '@store/podcast/types';
import Hint from './Hint'

import Swiper from 'react-native-swiper'

interface Props {
  podcast: PodcastType,
  isSent: boolean
}

const AnimatedWrapper = React.memo((props: Props) => {

  const existResult = useMemo(
    () => props.isSent
      && props.podcast.result
      && props.podcast.hint.replace(/\s/g, '') !== '', [])

  return (
    <React.Fragment>
      {
        (!props.podcast.hint || props.podcast.hint.replace(/\s/g, '') === '') ?
          <Player podcast={props.podcast} /> :
          <Swiper>
            <Player podcast={props.podcast} />
            <Hint hint={existResult ? props.podcast.result : props.podcast.hint} />
          </Swiper>
      }
    </React.Fragment>

  )
})


export default AnimatedWrapper;