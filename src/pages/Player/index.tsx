/* eslint-disable prettier/prettier */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { useMemo, useEffect } from 'react';
import styled from 'styled-components/native';
import Header from "./Header";
import { connect } from 'react-redux';
import PodcastType from '@store/podcast/types';
import AnimatedWrapper from './AnimatedWrapper';
import {CustomTheme} from '@store/theme/ThemeWrapper'
import StatusBarView from '@/components/UI/StatusbarView';
import {  useCurrentUser, useIsSentPodcast } from '@/store/user/hooks';
import { RawPodcast } from '@/store/types';
const Wrapper = styled.View<{theme: CustomTheme}>`
  height: 100%;
  width: 100%;
  background-color: ${props=> props.theme.backgroundColor};
`;


interface Props {
    podcast: RawPodcast
}


const Main = React.memo((props: Props) => {

    const user = useCurrentUser()
    const currentResult = useIsSentPodcast(user);
    const isSent = true;


    return (
        <Wrapper>
            <StatusBarView/>
            <Header/>
            <AnimatedWrapper podcast={props.podcast} isSent = {isSent} />
        </Wrapper>
    );
},(prev,next)=> prev.podcast.id === next.podcast.id)

//@ts-ignore
Main.navigationOptions = {
    header: null
}




function mapStateToProps(state: any) {
    return {
        podcast: state.podcast.currentPodcast
    }
}


export default connect(mapStateToProps)(Main);

