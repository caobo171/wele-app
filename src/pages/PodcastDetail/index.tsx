/* eslint-disable prettier/prettier */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { useState, useContext } from 'react';

import AntDesignIcon from 'react-native-vector-icons/AntDesign';
//@ts-ignore
import { connect } from "react-redux";
import { View, TouchableOpacity, Alert, Linking } from 'react-native';

import styled from 'styled-components/native';
import globalPlayer from '@/service/playerService';
import storage from '@/service/localStorage';
import PodcastType from '@/store/podcast/types';
import { useCurrentPodcast } from '@/store/podcast/hooks';
import { NavigationContext } from 'react-navigation';
import { updateRecentPodcast } from '@/store/podcast/functions';


import {CustomTheme, ThemeMode} from '@store/theme/ThemeWrapper'

const Wrapper = styled.ScrollView<{theme: CustomTheme}>`
  height: 100%;
  width: 100%;
  background-color: ${props=> props.theme.backgroundColor};
`;

const HeaderWrapper = styled.View`
  height: 32px;
  flex-direction: row;
  justify-content: flex-start;
  padding: 0;
  
`;
const StyledBodyWrapper = styled.View`
  flex: 9;
  align-items: flex-start;
  padding: 10px 10px 10px 20px;
`;


const StyledContent = styled.View`
  width: 100%;
  margin: 0 ;
  flex-direction: column;
`;



const StyledUserWrapper = styled.View`
  width: 100%;
  flex-direction: column;
  border-style: solid;
  border-color: #d4d4d4;
  flex: 1;
`;


const StyledPodcastImage = styled.Image<{theme: CustomTheme}>`
  height: 176;
  width: 100%;
  border-radius: 10;
  margin: 10px 0px 20px 0px;

  ${props=> props.theme.name === ThemeMode.DARK && `
    opacity: 0.6;
  `}
`;

const StyledAntDesignIcon = styled(AntDesignIcon)`
  font-size: 28px;
  color: #a8a8a8;
  margin: 4px 0px 0px 10px;
`;

const StyledName = styled.Text<{theme: CustomTheme}>`
  width: 80%;
  text-align: left;
  font-size: 20px;
  letter-spacing: 1px;
  font-weight: bold; 
  margin-bottom: 20px;
  color: ${props=> props.theme.textColorH1};
`

const DescriptionInfo = styled.Text`
  color: #787878;
  font-size: 10px;
  margin-bottom: 20px;
`;

const DescriptionMain = styled.Text`
    color: #7a7a7a;
    letter-spacing: 1px;
    font-size: 12px;

`

const StyleSmallText = styled.Text`
  color: #a8a8a8;
`

const reFormatText = (text: string) => {
  return text.replace(/\n/g, '\n\n')
}

const trimText = (text: string) => {
  return text.substr(0, Math.min(text.length, 180)) + '...';
}

const StyledDescriptionWrapper = styled.View`
    flex-direction: row;
    flex-wrap: wrap;
    flex: 1;
`

const StyledReadmore = styled.Text<{theme: CustomTheme}>`
    font-size: 12px;
    font-weight: bold;
    margin-bottom: 20px;
    color: ${props=> props.theme.textColorH1};
`;

const StyledButtonWrapper = styled.View`
    flex-direction: row;
    width:100%;
`
const StyledPlayButton = styled.View`
    background-color: #25bf1d;
    width: 100px;
    height: 36px;
    align-items: center;
    justify-content: center;
    border-radius: 50px;
    margin-bottom: 10px;
`

const StyledDownloadButton = styled.View`
    background-color: #e0d051;
    width: 160px;
    height: 36px;
    align-items: center;
    justify-content: center;
    border-radius: 50px;
    margin-bottom: 10px;
    margin-left: 20px;
`

const StyledText = styled.Text`
    font-size: 16px;
    font-weight: bold;
    letter-spacing: 3px;
    color:  #6e6a4b;
    text-align: center;
    text-transform: uppercase;

    padding: 8px;
`

const WELE_DEFAULT_LINK = 'https://www.facebook.com/groups/WELEVN/learning_content/'

const PodcastDetail = () => {

  const [isBrief, setIsBrief] = useState(true)

  const currentPodcast = useCurrentPodcast()
  const nav = useContext(NavigationContext)


  const onPressPlayHandle = async () => {
    try {
      const res = await globalPlayer.pickTrack(currentPodcast)
      if (res !== true) {
        const podcast: PodcastType = {
          ...currentPodcast,
          uri: res
        }

        await storage.setRecentPodcasts(currentPodcast, podcast.uri as string)
        updateRecentPodcast(podcast)
        await nav.navigate('Player')
      }

    } catch (err) {
      Alert.alert('Fail to open File ', err.toString())
    }

  }
  return <React.Fragment>
    {
      currentPodcast && (
        <Wrapper>
          <HeaderWrapper>
            <TouchableOpacity onPress={() => {
              nav.navigate('Home')
            }}>
              <View>
                <StyledAntDesignIcon name={'arrowleft'} />
              </View>
            </TouchableOpacity>
          </HeaderWrapper>


          <StyledBodyWrapper>
            <StyledContent>
              <StyledUserWrapper >
                <StyledPodcastImage
                  resizeMode={"stretch"}
                  source={{ uri: currentPodcast.imgUrl }}
                />
                <StyledName>
                  {currentPodcast.name}
                </StyledName>

                <DescriptionInfo>
                  {currentPodcast.source} <StyleSmallText>dẫn bởi </StyleSmallText>{currentPodcast.narrator.displayName}
                </DescriptionInfo>

                <StyledButtonWrapper>
                <TouchableOpacity onPress={onPressPlayHandle}>
                  <StyledPlayButton>
                    <StyledText >Open</StyledText>
                  </StyledPlayButton>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => Linking.openURL(currentPodcast.downloadLink ? currentPodcast.downloadLink : WELE_DEFAULT_LINK)}>
                  <StyledDownloadButton >
                    <StyledText >Download </StyledText>
                  </StyledDownloadButton>
                </TouchableOpacity>
                </StyledButtonWrapper>
       

              </StyledUserWrapper>

              <StyledDescriptionWrapper>
                <DescriptionMain>
                  {/* { trimText(reFormatText(PODCAST.description)) } */}
                  {isBrief ? trimText(reFormatText(currentPodcast.description.replace(new RegExp('<br>', 'g'), '\n'))) :
                    reFormatText(currentPodcast.description.replace(new RegExp('<br>', 'g'), '\n'))}

                </DescriptionMain>

                <TouchableOpacity>
                  <StyledReadmore onPress={() => setIsBrief(!isBrief)}>{isBrief ? 'Read more ' : 'See less'}</StyledReadmore>
                </TouchableOpacity>


              </StyledDescriptionWrapper>

            </StyledContent>
          </StyledBodyWrapper>
        </Wrapper>
      )
    }
  </React.Fragment>
};

PodcastDetail.navigationOptions = {
  header: null
};


function mapStateToProps(state: any) {
  return {
    podcast: state.podcast.currentPodcast
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    updateRecentPodcast: (podcast: PodcastType) => dispatch(updateRecentPodcast(podcast))
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(PodcastDetail);

