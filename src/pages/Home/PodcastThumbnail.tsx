import React, { useContext } from "react";

import { TouchableOpacity } from "react-native";
import styled from 'styled-components/native';
import { CustomTheme, ThemeMode } from '@store/theme/ThemeWrapper'
import { NavigationScreenProp, NavigationContext } from "react-navigation";
import PodcastType from "@/store/podcast/types";
import { getPodcast } from "@/store/podcast/functions";
import UIBackgroundImage from "@/components/UI/UIBackgroundImage";
import Touchable from "@/components/UI/Touchable";
import Constants, { PodcastSource } from "@/Constants";
import { RawPodcast } from "@/store/types";


const StyledPodcastWrapper = styled.View<{ size: 'big' | 'medium', theme: CustomTheme }>`
    background-color: ${props => props.theme.backgroundColor};
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
    border-color: ${props => props.theme.borderSectionColor}
    padding-top: 10px;
`;

const StyledPodcastContent = styled.View`
  flex: 3;
  padding: 20px 10px 10px 10px;
`;

const StyledImageWrapper = styled.View`
  flex: 2;
`;



const StyledUIBackgroundImage = styled(UIBackgroundImage)`
  height: 90px;
  width: 120px;
  margin-top: 10px;
  margin-left: auto;
  margin-right: auto;
  background: #f8f8f8;
`


const Title = styled.Text<{ theme: CustomTheme }>`
  font-weight: bold;
  font-size: ${Constants.TITLE_FONTSIZE}px;
  margin-bottom: 16px;
  color: ${props => props.theme.textColorH1};
`;

const DescriptionMain = styled.Text<{ theme: CustomTheme }>`
  font-size: ${Constants.TITLE_FONTSIZE - 8}px;
  font-weight: 600;
  margin-bottom: 10px;
  color: ${props => props.theme.textColorH2};
`;

const StyleSmallText = styled.Text<{ theme: CustomTheme }>`
    color: ${props => props.theme.textColorH3};
`;
//  color: #a8a8a8;

const DescriptionSub = styled.Text<{ theme: CustomTheme }>`
  color: ${props => props.theme.textColorH2}
  font-size: ${Constants.TITLE_FONTSIZE - 8}px;
`;

const StyledPodcastImage = styled.Image<{ theme: CustomTheme }>`
  width: 100%;
  height: 100%;
`;


interface Props extends RawPodcast {

}


const TrimText = (text: string) => {
	if (text.length <= 60) {
		return text;
	}
	return text.substr(0, Math.min(text.length, 60)) + "...";
};
const PodcastThumbnail = (props: Props) => {

	const nav = useContext(NavigationContext)
	const openPodcastDetailHandle = () => {
		getPodcast(props.id)
		nav.navigate('PodcastDetail')
	}

	return (
		<Touchable
			onPress={openPodcastDetailHandle}
		>
			<StyledPodcastWrapper size="big">
				<StyledPodcastContent>
					<Title>[ESL {props.sub_name}] {props.name}</Title>
					<DescriptionMain>{TrimText(props.description)}</DescriptionMain>
					<DescriptionSub>
						Nguồn <StyleSmallText>dẫn bởi </StyleSmallText>
						{PodcastSource.find(e => e.source_key == props.source_key) ? PodcastSource.find(e => e.source_key == props.source_key).source_name : 'Others'}
					</DescriptionSub>
				</StyledPodcastContent>
				<StyledImageWrapper>
					<StyledUIBackgroundImage>
						<StyledPodcastImage
							resizeMode={"contain"}
							source={{ uri: Constants.IMAGE_URL + props.image_url }}
						/>
					</StyledUIBackgroundImage>

				</StyledImageWrapper>
			</StyledPodcastWrapper>
		</Touchable>
	);
};




export default PodcastThumbnail;
