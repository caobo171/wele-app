import React from "react";
import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { CustomTheme, ThemeMode } from '@store/theme/ThemeWrapper'
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

const StyledButtonText = styled.Text<{ theme: CustomTheme }>`
  width: 32px;
  text-align: center;
  margin-top: 10px;
  height: 32px;
  font-weight: bold;
  font-size: 16px;
  color: ${props => props.theme.textColorH2};
`;

const StyledEntypoIcon = styled(EntypoIcon) <{ sizeMode: "small" | "big" }>`
  font-size: ${props => (props.sizeMode === "small" ? "28px" : "42px")};
  color: #e3e3e3;
  text-align: center;
`;

const StyledFeatherIcon = styled(FeatherIcon) <{ theme: CustomTheme }>`
  font-size: 28px;
  color: ${props => props.theme.textColorH2};
  margin: 8px 10px 8px 10px;
`;

const StyledBadge = styled.Text<{ theme: CustomTheme }>`
  font-size: 12px;
  font-weight: bold;
  border-radius: 50;
  top: 24px;
  left: 8px;
  width: 20px;
  position: absolute;
  color: ${props => props.theme.textColorH2};
`;

const StyledPlayButton = styled(TouchableOpacity)`
  background-color: #545454;
  border-radius: 35px;
  width: 70px;
  height: 70px;
  justify-content: center;
  align-items: center;
`;

const StyledPlayBackButton = styled(TouchableOpacity)`
  position: relative;
`;

interface Props {
  openSettings: () => void,
  onPausePlayHandle: () => void,
  onPlayBackHandle: () => void,
  speed: number,
  playing: boolean,
  playback: number
}

const ActionButtons = React.memo((props: Props) => {
  return (
    <StyledFeatureButtonGroup>
      <TouchableOpacity onPress={props.openSettings}>
        <StyledButtonText>{`${props.speed.toString()}x`}</StyledButtonText>
      </TouchableOpacity>

      <StyledPlayButton onPress={props.onPausePlayHandle}>
        <StyledEntypoIcon sizeMode={'big'}
          name={props.playing ? "controller-paus" : "controller-play"}
        />
      </StyledPlayButton>

      <StyledPlayBackButton onPress={props.onPlayBackHandle}>
        <StyledFeatherIcon name="corner-up-left" />
        <StyledBadge>{props.playback} </StyledBadge>
      </StyledPlayBackButton>
    </StyledFeatureButtonGroup>
  );
}, (prev, next) => prev.playback === next.playback
  && prev.playing === next.playing
  && prev.speed === next.speed);

export default ActionButtons;
