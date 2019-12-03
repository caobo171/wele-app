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
import Player from './Player'
import { connect } from 'react-redux';
import PodcastType from 'src/models/Podcast';
import AnimatedWrapper from './AnimatedWrapper';
const Wrapper = styled.View`
  height: 100%;
  width: 100%;
  color: yellow;
`;


interface Props {
    navigation: any,
    podcast: PodcastType
}


const Main = (props: Props) => {

    return (
        <Wrapper>
            <Header {...props} />
            <AnimatedWrapper podcast={props.podcast} />
        </Wrapper>
    );
}

Main.navigationOptions = {
    header: null
}




function mapStateToProps(state: any) {
    return {
        podcast: state.podcast.currentPodcast
    }
}


export default connect(mapStateToProps)(Main);

