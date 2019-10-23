import React from "react";
import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";

import EntypoIcon from "react-native-vector-icons/Entypo";
//@ts-ignore
import FeatherIcon from "react-native-vector-icons/Feather";

const StyledFeatureButtonGroup = styled.View`
  flex-direction: row;
  width: 90%;
  margin-left: auto;
  margin-right: auto;
  justify-content: space-around;
  align-items: center;
`;

const StyledButtonText = styled.Text`
  width: 32px;
  text-align: center;
  margin-top: 10px;
  height: 32px;
  font-weight: bold;
  font-size: 16px;
`;

const StyledEntypoIcon = styled(EntypoIcon)<{sizeMode:"small" | "big"}>`
  font-size: ${props => (props.sizeMode === "small" ? "28px" : "42px")};
  color: #e3e3e3;
  text-align: center;
`;

const StyledFeatherIcon = styled(FeatherIcon)`
  font-size: 28px;
  color: black;
  margin: 8px 10px 8px 10px;
`;

const StyledBadge = styled.Text`
  font-size: 12px;
  font-weight: bold;
  border-radius: 50;
  top: 24px;
  left: 8px;
  width: 20px;
  position: absolute;
`;

const StyledPlayButton = styled(TouchableOpacity)`
  background-color: #545454;
  border-radius: 50;
  padding: 8px;
`;

const StyledPlayBackButton = styled(TouchableOpacity)`
  position: relative;
`;

interface Props {
  openSettings: ()=> void,
  fastBackwardHandle: ()=> void,
  onPausePlayHandle: ()=> void,
  fastForwardHandle: ()=> void,
  onPlayBackHandle: ()=> void,
  speed: number,
  playing: boolean, 
  playback: number
}

const ActionButtons = ( props: Props )  => {
  return (
    <StyledFeatureButtonGroup>
      <TouchableOpacity onPress={props.openSettings}>
        <StyledButtonText>{`${props.speed.toString()}x`}</StyledButtonText>
      </TouchableOpacity>

      <StyledPlayButton onPress={props.fastBackwardHandle}>
        <StyledEntypoIcon sizeMode={"small"} name="controller-fast-backward" />
      </StyledPlayButton>

      <StyledPlayButton onPress={props.onPausePlayHandle}>
        <StyledEntypoIcon sizeMode = {'big'}
          name={props.playing ? "controller-paus" : "controller-play"}
        />
      </StyledPlayButton>

      <StyledPlayButton onPress={props.fastForwardHandle}>
        <StyledEntypoIcon sizeMode={"small"} name="controller-fast-forward" />
      </StyledPlayButton>

      <StyledPlayBackButton onPress={props.onPlayBackHandle}>
        <StyledFeatherIcon name="corner-up-left" />
        <StyledBadge>{props.playback} </StyledBadge>
      </StyledPlayBackButton>
    </StyledFeatureButtonGroup>
  );
};

export default ActionButtons;
