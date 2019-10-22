/* eslint-disable prettier/prettier */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { useEffect } from 'react';

import FeatherIcon from 'react-native-vector-icons/Feather';
import  useAsync from "react-use/lib/useAsync"; 
import { View , TouchableOpacity } from 'react-native';
import { connect } from "react-redux";

import UserProfile from './UserProfile'
import PodcastDetail from './PodcastDetail'
import PodcastThumbnail from '../components/Podcast/PodcastThumbnail'
import { getPodcastThisWeek } from '../redux/actions/podcastActions'


import { createStackNavigator } from 'react-navigation-stack';
import styled from 'styled-components';
import LoadingComponent from '../components/Loading/Loading';

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

const StyledSectionTitle = styled.Text`
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

const Home = (props) => {

  const state = useAsync(async ()=>{
    await props.getPodcastThisWeek()
  },[])

  return <React.Fragment>
    { state.loading? 
    (<LoadingComponent/>) : (
    <Wrapper>
      <HeaderWrapper>
        <TouchableOpacity onPress={()=>{
          console.log('check props', props);
          props.navigation.navigate('UserProfile');
          console.log('okkk')}}>
          <View>
            <StyledFeatherIcon name={'settings'}/>
          </View>
        </TouchableOpacity>
      </HeaderWrapper>
      <StyledBodyWrapper>
        <StyledSection>
          <StyledSectionTitle position="top">Podcast this week</StyledSectionTitle>
          <StyledSectionContent>
            {props.podcastThisWeek.map(e => {
              return <PodcastThumbnail key={e.id} {...e} {...props}/>
            })}
          </StyledSectionContent>
        </StyledSection>

        <StyledSection>
          <StyledSectionTitle position="normal">Recently Played</StyledSectionTitle>
          <StyledSectionContent>
            {props.recentPodcasts.map(e => {
              return <PodcastThumbnail key={e.id} {...e} {...props}/>
            })}
          </StyledSectionContent>
        </StyledSection>
        </StyledBodyWrapper>
      </Wrapper>
    )}
  </React.Fragment>
};

function mapStateToProps (state) {
  return {
    podcastThisWeek: state.podcast.podcastThisWeek,
    recentPodcasts: state.podcast.recentPodcasts,
  }
}



function mapDispatchToProps (dispatch) {
  return {
    getPodcastThisWeek: ()=> dispatch(getPodcastThisWeek())
  }
}

const ConnectedHome = connect(mapStateToProps,mapDispatchToProps )(Home)

const HomeContainer = createStackNavigator({
    Home: {
      screen: ConnectedHome,
      navigationOptions: {
        header: null,
      }
    },
    UserProfile: {
      screen: UserProfile,

    },
    PodcastDetail: {
      screen : PodcastDetail, 
    },
}, {
  initialRouteName : 'Home'
})
export default HomeContainer;
