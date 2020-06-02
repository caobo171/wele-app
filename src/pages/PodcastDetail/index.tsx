/* eslint-disable prettier/prettier */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { useState, useContext, useCallback, useMemo } from 'react';

import AntDesignIcon from 'react-native-vector-icons/AntDesign';
//@ts-ignore
import { connect } from "react-redux";
import { View, TouchableOpacity, Alert, Linking, Platform } from 'react-native';

import styled from 'styled-components/native';
import globalPlayer from '@/service/playerService';
import storage from '@/service/localStorage';
import PodcastType from '@/store/podcast/types';
import { useCurrentPodcast } from '@/store/podcast/hooks';
import { NavigationContext } from 'react-navigation';
import { updateRecentPodcast, updatePodcastNumber } from '@/store/podcast/functions';


import { CustomTheme, ThemeMode } from '@store/theme/ThemeWrapper'
import NetInfo from '@react-native-community/netinfo';
import StatusBarView from '@/components/UI/StatusbarView';
import UIBackgroundImage from '@/components/UI/UIBackgroundImage';
import Constants from '@/Constants';
import useEffectOnce from 'react-use/lib/useEffectOnce';
import Analytics from '@/service/Analytics';
import Touchable from '@/components/UI/Touchable';

const Wrapper = styled.ScrollView<{ theme: CustomTheme }>`
  height: 100%;
  width: 100%;
  background-color: ${props => props.theme.backgroundColor};
`;

const HeaderWrapper = styled.View`
  height: 32px;
  flex-direction: row;
  justify-content: flex-start;
  padding: 0;
  
`;
const SBodyWrapper = styled.View`
  flex: 9;
  align-items: flex-start;
  padding: 10px 10px 10px 20px;

  flex-direction: column;
`;


const SContent = styled.View`
  width: 100%;
  margin: 0 ;
  flex-direction: column;
`;



const SUserWrapper = styled.View`
  width: 100%;
  flex-direction: column;
  border-style: solid;
  border-color: #d4d4d4;
  flex: 1;
`;


const SPodcastImage = styled.Image<{ theme: CustomTheme }>`
  height: 100%;
  width: 100%;
  border-radius: 10;
`;


const SUIBackgroundImage = styled(UIBackgroundImage)`
  height: 200px;
  width: 100%;
  border-radius: 10;
  margin: 10px 0px 20px 0px;
`

const SAntDesignIcon = styled(AntDesignIcon)`
  font-size: 28px;
  color: #a8a8a8;
  margin: 4px 0px 0px 10px;
`;

const SName = styled.Text<{ theme: CustomTheme }>`
  width: 80%;
  text-align: left;
  font-size: ${Constants.TITLE_FONTSIZE}px;
  letter-spacing: 1px;
  font-weight: bold; 
  margin-bottom: 20px;
  color: ${props => props.theme.textColorH1};
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

const SDescriptionWrapper = styled.View`
    flex-direction: row;
    flex-wrap: wrap;
    flex: 1;
`

const SReadmore = styled.Text<{ theme: CustomTheme }>`
    font-size: 12px;
    font-weight: bold;
    margin-bottom: 20px;
    color: ${props => props.theme.textColorH1};
`;

const SButtonWrapper = styled.View`
    flex-direction: row;
    width:100%;
`
const SPlayButton = styled.View`
    background-color: #25bf1d;
    height: 36px;
    align-items: center;
    justify-content: center;
    border-radius: 50px;
    margin-bottom: 10px;
`

const SDownloadButton = styled.View`
    background-color: #e0d051;
    width: 160px;
    height: 36px;
    align-items: center;
    justify-content: center;
    border-radius: 50px;
    margin-bottom: 10px;
    margin-left: 20px;

`

const SText = styled.Text`
    font-size: ${Constants.BUTTON_FONTSIZE}px;
    font-weight: bold;
    letter-spacing: 3px;
    color:  #6e6a4b;
    text-align: center;
    text-transform: uppercase;

    padding: 8px;
    
`

const SLink = styled.Text`
  textDecorationLine: underline;
  color: #6bed3b;
`

const STouchable = styled(Touchable)`
  height: 60px;
  width: 60px;
`

const WELE_DEFAULT_LINK = 'https://www.facebook.com/groups/WELEVN/learning_content/'

const PodcastDetail = React.memo(() => {

  const [isBrief, setIsBrief] = useState(true)

  const currentPodcast = useCurrentPodcast()
  const nav = useContext(NavigationContext)


  useEffectOnce(()=>{
    Analytics.trackScreenView('PodcastDetail');
    Analytics.readDetail(currentPodcast);
  })

  const onReadmoreHandle = useCallback(() => {
    setIsBrief(!isBrief)
  }, [isBrief])

  const onPressPlayHandle = useCallback(async () => {
    Analytics.playPodcast(currentPodcast);
    try {
      const res = await globalPlayer.pickTrack(currentPodcast)
      
      if (res !== true) {
        const {uri, ...rest} = currentPodcast
        const podcast: PodcastType = {
          ...rest,
          timeListen: currentPodcast.timeListen ? currentPodcast.timeListen + 1 : 1,
          uri: res
        }

        const netState = await NetInfo.fetch()
        if(netState.isConnected){
          await updatePodcastNumber(podcast)
        }
       

        await storage.setRecentPodcasts(currentPodcast, podcast.uri as string)
        updateRecentPodcast(podcast)
        await nav.navigate('Player')
      }

    } catch (err) {
      Alert.alert('Fail to open File ', err.toString())
    }

  }, [currentPodcast.id])
  return <PodcastDetailMemo
    podcast={currentPodcast}
    isBrief={isBrief}
    onReadmoreHandle={onReadmoreHandle}

    onPressPlayHandle={onPressPlayHandle}
  />
})


interface Props {
  podcast: PodcastType,
  isBrief: boolean,
  onReadmoreHandle: () => void,
  onPressPlayHandle: () => void
}

const PodcastDetailMemo = React.memo((props: Props) => {
  const nav = useContext(NavigationContext)


  const openText = useMemo(()=>{
    return Platform.select({
      ios: <StyledText >Open File</StyledText>,
      android: <StyledText >Open</StyledText>,
    })
  }, [])

  const goBackHandle = useCallback(()=>{
    nav.goBack()
  }, [])

  const openLink = useCallback(()=>{
    Linking.openURL(props.podcast.downloadLink ? props.podcast.downloadLink : WELE_DEFAULT_LINK);
  }, [props.podcast])

  return <React.Fragment>
    {
      props.podcast && (
        <Wrapper>
          <StatusBarView/>
          <HeaderWrapper>
            <STouchable onPress={goBackHandle}>
              <View>
                <SAntDesignIcon name={'arrowleft'} />
              </View>
            </STouchable>
          </HeaderWrapper>


          <SBodyWrapper>
            <SContent>
              <SUserWrapper >
                <SUIBackgroundImage>
                  <SPodcastImage
                    resizeMode={"stretch"}
                    source={{ uri: props.podcast.imgUrl }}
                  />
                </SUIBackgroundImage>

                <SName>
                  {props.podcast.name}
                </SName>

                <DescriptionInfo>
                  {props.podcast.source} <StyleSmallText>dẫn bởi </StyleSmallText>{props.podcast.narrator.displayName}
                </DescriptionInfo>

                <SButtonWrapper>
                  <TouchableOpacity onPress={props.onPressPlayHandle}>
                    <SPlayButton>
                        {openText}
                    </SPlayButton>
                  </TouchableOpacity>

                  {
                    Platform.OS !== 'ios' && (
                      <TouchableOpacity onPress={openLink}>
                      <SDownloadButton >
                        <SText >Download</SText>
                      </SDownloadButton>
                    </TouchableOpacity>
                    )
                  }

                </SButtonWrapper>


              </SUserWrapper>

              <SDescriptionWrapper>
                <DescriptionMain>
                  {/* { trimText(reFormatText(PODCAST.description)) } */}
                  {props.isBrief ? trimText(reFormatText(props.podcast.description.replace(new RegExp('<br>', 'g'), '\n'))) :
                    reFormatText(props.podcast.description.replace(new RegExp('<br>', 'g'), '\n'))}

                </DescriptionMain>

                {!props.isBrief && <TouchableOpacity>
                  <SLink onPress={openLink}>{'Link download'}</SLink>
                </TouchableOpacity> }


              </SDescriptionWrapper>
              <TouchableOpacity>
                  <SReadmore onPress={props.onReadmoreHandle}>{props.isBrief ? 'Read more ' : 'See less'}</SReadmore>
              </TouchableOpacity>

            </SContent>
          </SBodyWrapper>
        </Wrapper>
      )
    }
  </React.Fragment>
})

//@ts-ignore
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

