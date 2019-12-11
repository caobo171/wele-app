import React, { useContext } from "react";

import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { CustomTheme, ThemeMode } from '@store/theme/ThemeWrapper'
import PodcastType from "@/store/podcast/types";
import { getPodcast } from "@/store/podcast/functions";
import { NavigationContext } from "react-navigation";

const StyledPodcastWrapper = styled.View<{ size: 'big' | 'medium', theme: CustomTheme }>`
  background-color: ${props => props.theme.backgroundColor};
  height: 64px;
  width: 100%;
  flex-direction: row;

  margin: 0;
`;

const StyledPodcastContent = styled.View`
  flex: 3;
  padding: 6px 0px 4px 0px;
`;

const StyledImageWrapper = styled.View`
  flex: 1.2;
`;

const Title = styled.Text<{theme: CustomTheme}>`
  font-weight: bold;
  font-size: 12px;
  margin-bottom: 5px;
  color: ${props=> props.theme.textColorH1}
`;


const StyleSmallText = styled.Text`
  color: #a8a8a8;
`;

const DescriptionSub = styled.Text`
  color: #787878;
  font-size: 10px;
`;

const StyledPodcastImage = styled.Image<{theme: CustomTheme}>`
  height: 60px;
  width: 80px;
  margin-top: 4px;
  margin-left: auto;
  margin-right: auto;
  ${props => props.theme.name === ThemeMode.DARK && `
  opacity: 0.6;
  `}
`;


interface Props extends PodcastType {
}

const TrimText = (text: string) => {
  return text.substr(0, Math.min(text.length, 50)) + "...";
};

const PodcastItem = (props: Props) => {

  const nav = useContext(NavigationContext)

  const openPodcastDetailHandle = () => {
    getPodcast(props.id)
    nav.navigate("PodcastDetail")
  }

  return (
    <TouchableOpacity
      onPress={openPodcastDetailHandle}
    >
      <StyledPodcastWrapper size="big">
        <StyledImageWrapper>
          <StyledPodcastImage
            resizeMode={"contain"}
            source={{ uri: props.imgUrl }}
          />
        </StyledImageWrapper>


        <StyledPodcastContent>
          <Title>{TrimText(props.name)}</Title>
          <DescriptionSub>
            {props.source} <StyleSmallText>dẫn bởi </StyleSmallText>
            {props.narrator.displayName}
          </DescriptionSub>
        </StyledPodcastContent>

      </StyledPodcastWrapper>
    </TouchableOpacity>
  );
};




export default PodcastItem;
