import React, { useContext } from "react";

import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import {  NavigationScreenProp, NavigationContext } from "react-navigation";
import PodcastType from "@/store/podcast/types";
import { getPodcast } from "@/store/podcast/functions";


const StyledPodcastWrapper = styled.View<{size: 'big' | 'medium'}>`
  background-color: white;
  height: ${props =>
    props.size === "big"
      ? "200px"
      : props.size === "medium"
      ? "180px"
      : "160px"};
  width: 100%;
  flex-direction: row;
  margin: 0;
  border-bottom-width: 1px;
  border-style: solid;
  border-color: #d4d4d4;
  padding-top: 10px;
`;

const StyledPodcastContent = styled.View`
  flex: 3;
  padding: 20px 10px 10px 10px;
`;

const StyledImageWrapper = styled.View`
  flex: 2;
`;

const Title = styled.Text`
  font-weight: bold;
  font-size: 20px;
  margin-bottom: 16px;
`;

const DescriptionMain = styled.Text`
  font-size: 12px;
  font-weight: 600;
  margin-bottom: 10px;
`;

const StyleSmallText = styled.Text`
  color: #a8a8a8;
`;

const DescriptionSub = styled.Text`
  color: #787878;
  font-size: 10px;
`;

const StyledPodcastImage = styled.Image`
  height: 90px;
  width: 120px;
  margin-top: 10px;
  margin-left: auto;
  margin-right: auto;
`;


interface Props extends PodcastType {

}


const TrimText = (text:string) => {
  return text.substr(0, Math.min(text.length, 60)) + "...";
};
const PodcastThumbnail = (props: Props) => {

  const nav = useContext(NavigationContext)
  const openPodcastDetailHandle = ()=>{
    getPodcast(props.id)
    nav.navigate('PodcastDetail')
  }

  return (
    <TouchableOpacity
      onPress={openPodcastDetailHandle}
    >
      <StyledPodcastWrapper size="big">
        <StyledPodcastContent>
          <Title>{props.name}</Title>
          <DescriptionMain>{TrimText(props.description)}</DescriptionMain>
          <DescriptionSub>
            {props.source} <StyleSmallText>dẫn bởi </StyleSmallText>
            {props.narrator.displayName}
          </DescriptionSub>
        </StyledPodcastContent>
        <StyledImageWrapper>
          <StyledPodcastImage
            resizeMode={"contain"}
            source={{ uri: props.imgUrl }}
          />
        </StyledImageWrapper>
      </StyledPodcastWrapper>
    </TouchableOpacity>
  );
};




export default PodcastThumbnail;