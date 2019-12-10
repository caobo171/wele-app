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
import Header from "./Header";
import { connect } from 'react-redux';
import PodcastType from '@store/podcast/types';
import AnimatedWrapper from './AnimatedWrapper';
const Wrapper = styled.View`
  height: 100%;
  width: 100%;
  color: yellow;
`;


interface Props {
    podcast: PodcastType
}


const Main = (props: Props) => {

    return (
        <Wrapper>
            <Header/>
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

