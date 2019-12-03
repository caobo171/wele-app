import React, { useContext } from 'react'
import { View, TouchableOpacity , ProgressBarAndroid } from 'react-native'
import styled from "styled-components/native"

import EntypoIcon from "react-native-vector-icons/Entypo";
import globalPlayer from '../../hooks/playerHooks';
import { PlayerContext } from '../../MainWrapper';

const StyledView = styled.View`
    height: 32px;
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin: 0;
`
const Wrapper = styled.View`
height: 100%;
width: 100%;
`

const StyledPlayButton = styled(TouchableOpacity)`
  border-radius: 50px;
  padding: 4px;
  border-width: 2px;
  border-color: #a8a8a8;
  margin-right: 8px;
`;


const StyledEntypoIcon = styled(EntypoIcon)`
  font-size: 12px;
  color: #a8a8a8;
`;


const StyledAntEntypoIcon = styled(EntypoIcon)`
  font-size: 12px;
  color: #a8a8a8;
  margin-left: 8px;
`;


const StyledText = styled.Text`
    font-size: 12px;
    color: #a8a8a8;
`

const StyledProgressBarAndroid = styled(ProgressBarAndroid)`
    padding: 0;
    margin: 0;
    background-color: #e6e6e6;
    height: 2px;
    color:  #a8a8a8;
`

const trimText = (text:string) => {
    const length = 52
    if(text.length <= length) return text
    return text.substr(0, Math.min(text.length, length)) + "...";
  };

const PlayerThumbnail = (props:any)=>{

    const { state, position , track } = useContext(PlayerContext)

    const navigateToPlayer = ()=>{
        props.navigation.navigate('Player')
    }
    return(
        <Wrapper>
            {props.children}

            {track && (
                <React.Fragment>
                    <StyledProgressBarAndroid styleAttr="Horizontal" indeterminate={false} 
                    progress={ ( !position || position.duration <= 0 ) ? 0 : position.position /position.duration} />
                    <StyledView>
                        <TouchableOpacity onPress = {navigateToPlayer}>
                            <StyledAntEntypoIcon name={"chevron-thin-up"} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress = {navigateToPlayer}>
                            <StyledText>{trimText( track ? track.title : '')}</StyledText>
                        </TouchableOpacity>
                        <StyledPlayButton onPress ={()=>{
                            globalPlayer.playPause()
                        }}> 
                            <StyledEntypoIcon name={globalPlayer.isPlaying(state) ? "controller-paus" : "controller-play"} />
                        </StyledPlayButton>
                        
                    </StyledView>
                </React.Fragment>
            )}
        </Wrapper>
    )
}


export default PlayerThumbnail;