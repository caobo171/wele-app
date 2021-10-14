import React, { useContext } from "react";

import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { CustomTheme, ThemeMode } from '@store/theme/ThemeWrapper'
import PodcastType from "@/store/podcast/types";
import { getPodcast } from "@/store/podcast/functions";
import { NavigationContext } from "react-navigation";
import UIBackgroundImage from "@/components/UI/UIBackgroundImage";
import Constants, { PodcastSource } from "@/Constants";
import { RawPodcast } from "@/store/types";

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

const StyledUIBackgroundImage = styled(UIBackgroundImage)`
  height: 60px;
  width: 80px;
  margin-top: 4px;
  margin-left: auto;
  margin-right: auto;
`

const Title = styled.Text<{ theme: CustomTheme }>`
  font-weight: bold;
  font-size: ${Constants.PODCAST_ITEM_FONTSIZE}px;
  margin-bottom: 5px;
  color: ${props => props.theme.textColorH1}
`;


const StyleSmallText = styled.Text`
  color: #a8a8a8;
`;

const DescriptionSub = styled.Text`
  color: #787878;
  font-size: ${Constants.PODCAST_ITEM_FONTSIZE - 2}px;
`;

const StyledPodcastImage = styled.Image<{ theme: CustomTheme }>`
  width: 100%;
  height: 100%;
`;


interface Props extends RawPodcast {
}

const TrimText = (text: string) => {
  if (text.length <= 50) {
    return text;
  }
  return text.substr(0, Math.min(text.length, 50)) + "...";
};

const PodcastItem = (props: Props) => {

  const nav = useContext(NavigationContext)

  const openPodcastDetailHandle = () => {
    getPodcast(props.id)
    nav.navigate("PodcastDetail")
  }

  console.log('podcast', Constants.IMAGE_URL + props.image_url)

  return (
    <TouchableOpacity
      onPress={openPodcastDetailHandle}
    >
      <StyledPodcastWrapper size="big">
        <StyledImageWrapper>
          <StyledUIBackgroundImage>
            <StyledPodcastImage
              resizeMode={"contain"}
              source={{ uri: Constants.IMAGE_URL + props.image_url }}
            />
          </StyledUIBackgroundImage>

        </StyledImageWrapper>


        <StyledPodcastContent>
          <Title>[ESL {props.sub_name}] {TrimText(props.name)}</Title>
          <DescriptionSub>
            Nguồn <StyleSmallText>dẫn bởi </StyleSmallText>
            {PodcastSource.find(e => e.source_key == props.source_key) ? PodcastSource.find(e => e.source_key == props.source_key).source_name : 'Others'}
          </DescriptionSub>
        </StyledPodcastContent>

      </StyledPodcastWrapper>
    </TouchableOpacity>
  );
};




export default PodcastItem;
