import React from "react";
import styled from "styled-components/native";
import PodcastType from "@store/podcast/types";

import { CustomTheme, ThemeMode } from '@store/theme/ThemeWrapper'
import UIBackgroundImage from "@/components/UI/UIBackgroundImage";
import Constants, { PodcastSource } from "@/Constants";
import { RawPodcast } from "@/store/types";


const StyledInfoWrapper = styled.View`
  width: 100%;
  flex-direction: column;
  border-style: solid;
  border-color: #d4d4d4;
  flex: 1.5;
`;

const StyledPodcastImage = styled.Image`
  width: 100%;
  height: 100%
`;

const StyleInfo = styled.View`
  width: 90%;
  margin-left: auto;
  margin-right: auto;
`;

const StyledNameText = styled.Text<{ theme: CustomTheme }>`
  font-weight: bold;
  font-size: ${Constants.TITLE_FONTSIZE}px;
  margin-bottom: 12px;
  color: ${props => props.theme.textColorH1};
`;

const StyleSmallText = styled.Text`
  color: #a8a8a8;
`;

const DescriptionSub = styled.Text`
  color: #787878;
  font-size: 10px;
`;

const StyledUIBackgroundImage = styled(UIBackgroundImage)`
  height: 200;
  width: 96%;
  margin-left: auto;
  margin-right: auto;
  margin-top: 20px;
  margin-bottom: 20px;
`


const Info = React.memo((props: RawPodcast) => {

  return (
    <StyledInfoWrapper>
      <StyledUIBackgroundImage>
        <StyledPodcastImage
          resizeMode={"contain"}
          source={{ uri: Constants.IMAGE_URL + props.image_url }}
        />
      </StyledUIBackgroundImage>

      <StyleInfo>
        <StyledNameText>{props.name}</StyledNameText>
        <DescriptionSub>
          {PodcastSource.find(e => e.source_key == props.source_key) ? PodcastSource.find(e => e.source_key == props.source_key).source_name : 'Others'}
        </DescriptionSub>
      </StyleInfo>
    </StyledInfoWrapper>
  );
}, (prev, next) => prev.id === next.id);

export default Info;
