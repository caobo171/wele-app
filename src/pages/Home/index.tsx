/* eslint-disable prettier/prettier */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { useEffect } from 'react';

import  useAsync from "react-use/lib/useAsync"; 
import { FlatList } from 'react-native';

import PodcastThumbnail from './PodcastThumbnail'

import styled from 'styled-components/native';
import LoadingComponent from '@components/Loading/Loading';
import  Header  from './Header';
import { getPodcastThisWeek, getRecentPodcast } from '@/store/podcast/functions';
import { usePodcastThisWeek, useRecentPodcasts } from '@/store/podcast/hooks';

const Wrapper = styled.ScrollView`
  height: 100%;
  width: 100%;
  color: yellow;
`;


const StyledBodyWrapper = styled.View`
  background-color: white;
  flex: 9;
  align-items: flex-start;
`;


const StyledSection = styled.View`
  width: 100%;
  margin: 0 ;
  background-color: white;
`;

const StyledSectionTitle = styled.Text<{position:'top'|'normal'}>`
  color: black;
  font-size: ${props=> props.position === 'top' ? '24px' : '20px' } ;
  font-weight: ${props=> props.position === 'top' ? 'bold' : '900' } ;
  padding-bottom: 16px;
  margin: ${props=> props.position === 'top' ? '-12px' : '28px' } 10px 0px 10px; 
  border-bottom-width: 1px;
  border-color: #d4d4d4;
`;

const StyledSectionContent = styled.View``;


const Home = () => {

  const state = useAsync(async ()=>{
    await getPodcastThisWeek()
    await getRecentPodcast()
  },[])


  const podcastThisWeek  = usePodcastThisWeek()
  const recentPodcasts = useRecentPodcasts()

  return <React.Fragment>
    { state.loading? 
    (<LoadingComponent/>) : (
    <Wrapper
    keyboardShouldPersistTaps={'always'}
    >
      <Header/>

      <StyledBodyWrapper>
        <StyledSection>
          <StyledSectionTitle position="top">Podcast this week</StyledSectionTitle>
          <StyledSectionContent>
            <FlatList
              data={podcastThisWeek}
              renderItem={( {item } )=><PodcastThumbnail {...item}/> }
              keyExtractor={item => item.id}
            />
          </StyledSectionContent>
        </StyledSection>

        <StyledSection>
          { recentPodcasts.length > 0 && <StyledSectionTitle position="normal">Recently Played</StyledSectionTitle> }
          <StyledSectionContent>
            <FlatList
              data={recentPodcasts}
              renderItem={( {item, index } )=><PodcastThumbnail {...item}/> }
              keyExtractor={item => item.id}
            />
          </StyledSectionContent>
        </StyledSection>
        </StyledBodyWrapper>
      </Wrapper>
    )}
  </React.Fragment>
};




export default Home
