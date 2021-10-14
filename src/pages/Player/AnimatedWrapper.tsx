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
import { FILLER_TEXT } from '@/Constants';
import { RawPodcast } from '@/store/types';

interface Props {
  podcast: RawPodcast,
  isSent: boolean
}
// lay 1 van ban de hien thi hint tuong trung
export const getHintText = (text: string, hint_indexes: number[]) => {
  // convert ve cung mot kieu dau cach
  text = text.replace(/\s+/g, " ");

  let words = text.split(" ");
  let output = "";

  // thay cac tu ko co trong hint thanh filler text
  let j = 0;
  for (let i = 0; i < words.length; i++) {
    if (i < hint_indexes[j]) {
      words[i] = FILLER_TEXT;
    } else {
      j++;
    }

    // ghep cac tu lai voi nhau
    if (i != 0) {
      output += " ";
    }

    output += words[i];
  }

  return output;
}

const AnimatedWrapper = React.memo((props: Props) => {

  // const existResult = useMemo(
  //   () => props.isSent
  //     && props.podcast.result
  //     && props.podcast.hint.replace(/\s/g, '') !== '', [])

  return (
    <React.Fragment>
      {
        (!props.podcast.hint && props.podcast.hint.length) ?
          <Player podcast={props.podcast} /> :
          <Swiper loop={false}>
            <Player podcast={props.podcast} />
            <Hint hint={getHintText(props.podcast.result, props.podcast.hint ? props.podcast.hint : [])} />
          </Swiper>
      }
    </React.Fragment>

  )
})


export default AnimatedWrapper;