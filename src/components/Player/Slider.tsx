import React from "react";

import Slider from "@react-native-community/slider";
import styled from "styled-components/native";

const StyledSlider = styled(Slider)`
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 12px;
  width: 100%;
  font-size: 5px;
  height: 10px;
`;

const StyledViewTimeIndicator = styled.View`
  justify-content: space-between;
  flex-direction: row;
  width: 94%;
  margin-left: auto;
  margin-right: auto;
`;

const StyledTime = styled.Text`
  font-size: 12px;
  color: #919191;
`;

const convertTime = (second:number) => {
  const roundedSecond = Math.round(second);
  const rSecond = roundedSecond % 60;
  return `${(roundedSecond - rSecond) / 60}:` + `${rSecond}`.padStart(2, "0");
};

interface Props {
  onSlidingComplete: (value: number)=> void,
  onSlidingStart: () => void,
  duration : number,
  position: number,
}

const PlayerSlider = (props: Props) => {
  return (
    <React.Fragment>
      <StyledSlider
        onSlidingComplete={props.onSlidingComplete}
        onSlidingStart={props.onSlidingStart}
        minimumValue={0}
        maximumValue={props.duration}
        minimumTrackTintColor="#919191"
        maximumTrackTintColor="#e3e3e3"
        thumbTintColor="#919191"
        value={props.position}
      />
      <StyledViewTimeIndicator>
        <StyledTime>{convertTime(props.position)}</StyledTime>
        <StyledTime>{convertTime(props.duration)}</StyledTime>
      </StyledViewTimeIndicator>
    </React.Fragment>
  );
};

export default PlayerSlider;
