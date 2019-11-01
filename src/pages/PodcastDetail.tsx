/* eslint-disable prettier/prettier */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React , {useState  } from 'react';

import AntDesignIcon from 'react-native-vector-icons/AntDesign';
//@ts-ignore
import { connect } from "react-redux";
import { View, TouchableOpacity, Alert } from 'react-native';



import styled from 'styled-components/native';
import PodcastType from 'src/models/Podcast';
import { NavigationScreenProp } from 'react-navigation';
import globalPlayer from '../hooks/playerHooks';
import storage from '../helpers/localStorage';
import { updateRecentPodcast } from '../redux/actions/podcastActions';

const Wrapper = styled.ScrollView`
  height: 100%;
  width: 100%;
`;

const HeaderWrapper = styled.View`
  background-color: white;
  height: 32px;
  flex-direction: row;
  justify-content: flex-start;
  padding: 0;
  
`;
const StyledBodyWrapper = styled.View`
  background-color: white;
  flex: 9;
  align-items: flex-start;
  padding: 10px 10px 10px 20px;
`;


const StyledContent = styled.View`
  width: 100%;
  margin: 0 ;
  background-color: white;
  flex-direction: column;
`;



const StyledUserWrapper = styled.View`
  width: 100%;
  flex-direction: column;
  border-style: solid;
  border-color: #d4d4d4;
  flex: 1;
`;


const StyledPodcastImage = styled.Image`
  height: 140;
  width: 68%;
  border-radius: 10;
  margin: 10px 0px 20px 0px;
`;

const StyledAntDesignIcon = styled(AntDesignIcon)`
  font-size: 28px;
  color: #a8a8a8;
  margin: 4px 0px 0px 10px;
`;

const StyledName = styled.Text`
  width: 80%;
  text-align: left;
  font-size: 20px;
  letter-spacing: 1px;
  font-weight: bold; 
  margin-bottom: 20px;
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

const reFormatText = (text: string)=>{
    return text.replace(/\n/g, '\n\n')
}

const trimText = (text: string)=>{
    return text.substr(0, Math.min(text.length, 180)) + '...' ;
}

const StyledDescriptionWrapper = styled.View`
    flex-direction: row;
    flex-wrap: wrap;
    flex: 1;
`

const StyledReadmore = styled.Text`
    font-size: 12px;
    font-weight: bold;
    margin-bottom: 20px;
`;

const StyledPlayButton = styled.View`
    background-color: #25bf1d;
    width: 100px;
    height: 36px;
    align-items: center;
    justify-content: center;
    border-radius: 50px;
    margin-bottom: 10px;
`

const StyledText = styled.Text`
    font-size: 16px;
    font-weight: bold;
    letter-spacing: 3px;
    color: #ededed;
`

interface Props {
  podcast: PodcastType,
  updateRecentPodcast: (podcast: PodcastType)=> void
  navigation: NavigationScreenProp<any,any>,
}

const PodcastDetail = (props: Props) => {

  const [isBrief, setIsBrief] = useState(true)

  console.log('check podcast', props.podcast)

  const onPressPlayHandle = async ()=>{
    try{
      const res = await globalPlayer.pickTrack(props.podcast)
      if(res !== true){

        console.log('aaaaaaaaaaaaaa')
        const podcast: PodcastType = {
          ...props.podcast,
          uri: res
        }

        await storage.setRecentPodcasts(props.podcast, podcast.uri as string)
        await props.updateRecentPodcast(podcast)
        await props.navigation.navigate('Player')
      }
     
    }catch(err){
      Alert.alert('Fail to open File ', err.toString())
    }
    
  }
  return <React.Fragment>
    {
      props.podcast && (
        <Wrapper>
          <HeaderWrapper>
            <TouchableOpacity onPress={() => {
              props.navigation.navigate('Home')
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
                            source={{ uri: props.podcast.imgUrl }}
                        />
                        <StyledName>
                            {props.podcast.name}
                        </StyledName>
    
                        <DescriptionInfo>
                            {props.podcast.source} <StyleSmallText>dẫn bởi </StyleSmallText>{props.podcast.narrator.displayName}
                        </DescriptionInfo>
                        <TouchableOpacity onPress={onPressPlayHandle}>
                          <StyledPlayButton>
                              <StyledText >Open</StyledText>
                          </StyledPlayButton>
                        </TouchableOpacity>
    
                    </StyledUserWrapper>
    
                    <StyledDescriptionWrapper>
                        <DescriptionMain>
                        {/* { trimText(reFormatText(PODCAST.description)) } */}
                        { isBrief ? trimText(reFormatText(props.podcast.description)) :  reFormatText(props.podcast.description) }
    
                        </DescriptionMain>
    
                        <TouchableOpacity>
                            <StyledReadmore onPress={()=> setIsBrief(!isBrief)}>{isBrief ? 'Read more ' : 'See less'}</StyledReadmore>
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


function mapStateToProps (state: any) {
  return {
    podcast: state.podcast.currentPodcast
  }
}

const mapDispatchToProps = (dispatch: any)=>{
  return {
    updateRecentPodcast: (podcast: PodcastType) => dispatch(updateRecentPodcast(podcast))
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(PodcastDetail);

