/* eslint-disable prettier/prettier */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { useEffect } from 'react';
//@ts-ignore
import FeatherIcon from 'react-native-vector-icons/Feather';
import  useAsync from "react-use/lib/useAsync"; 
import { View , TouchableOpacity, FlatList } from 'react-native';


//@ts-ignore
import { connect } from "react-redux";

import PodcastThumbnail from '../components/Podcast/PodcastThumbnail'
import { getPodcastThisWeek, getRecentPodcast } from '../redux/actions/podcastActions'

import styled from 'styled-components/native';
import LoadingComponent from '../components/Loading/Loading';
import { NavigationScreenProp } from 'react-navigation';
import PodcastType from 'src/models/Podcast';

const Wrapper = styled.ScrollView`
  height: 100%;
  width: 100%;
  color: yellow;
`;

const HeaderWrapper = styled.View`
  background-color: white;
  height: 32px;
  flex-direction: row;
  justify-content: flex-end;
  padding: 0;
  
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

const StyledFeatherIcon = styled(FeatherIcon)`
  font-size: 28px;
  color: #a8a8a8;
  margin: 4px 20px 0px 0px;
`;


interface Props {
  getPodcastThisWeek : ()=> void,
  getRecentPodcasts : ()=> void,
  navigation : NavigationScreenProp<any,any>,
  podcastThisWeek: Array<PodcastType>,
  recentPodcasts: Array<PodcastType>
}

const Home = (props: Props) => {

  const state = useAsync(async ()=>{
    await props.getPodcastThisWeek()
    await props.getRecentPodcasts()
  },[])

  return <React.Fragment>
    { state.loading? 
    (<LoadingComponent/>) : (
    <Wrapper
    keyboardShouldPersistTaps={'always'}
    >
      <HeaderWrapper>
        <TouchableOpacity onPress={()=>{
     
          props.navigation.navigate('UserProfile');
         }}>
          <View>
            <StyledFeatherIcon name={'settings'}/>
          </View>
        </TouchableOpacity>
      </HeaderWrapper>
      <StyledBodyWrapper>
        <StyledSection>
          <StyledSectionTitle position="top">Podcast this week</StyledSectionTitle>
          <StyledSectionContent>
            <FlatList
              data={props.podcastThisWeek}
              renderItem={( {item } )=><PodcastThumbnail {...item} {...props}/> }
              keyExtractor={item => item.id}
            />
          </StyledSectionContent>
        </StyledSection>

        <StyledSection>
          { props.recentPodcasts.length > 0 && <StyledSectionTitle position="normal">Recently Played</StyledSectionTitle> }
          <StyledSectionContent>
            <FlatList
              data={props.recentPodcasts}
              renderItem={( {item, index } )=><PodcastThumbnail {...item} {...props}/> }
              keyExtractor={item => item.id}
            />
          </StyledSectionContent>
        </StyledSection>
        </StyledBodyWrapper>
      </Wrapper>
    )}
  </React.Fragment>
};

function mapStateToProps (state: any) {
  return {
    podcastThisWeek: [...state.podcast.podcastThisWeek.values()],
    recentPodcasts: [...state.podcast.recentPodcasts.values()],
  }
}



function mapDispatchToProps (dispatch: any) {
  return {
    getPodcastThisWeek: ()=> dispatch(getPodcastThisWeek()),
    getRecentPodcasts: ()=> dispatch(getRecentPodcast())
  }
}



export default connect(mapStateToProps,mapDispatchToProps )(Home)
