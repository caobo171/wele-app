import React from "react";

import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import PodcastType from "src/models/Podcast";
import {  NavigationScreenProp, NavigationActions } from "react-navigation";
import { connect } from "react-redux";
import { getPodcast } from "../../redux/actions/podcastActions";

const StyledPodcastWrapper = styled.View<{size: 'big' | 'medium'}>`
  background-color: white;
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

const Title = styled.Text`
  font-weight: bold;
  font-size: 12px;
  margin-bottom: 5px;
`;


const StyleSmallText = styled.Text`
  color: #a8a8a8;
`;

const DescriptionSub = styled.Text`
  color: #787878;
  font-size: 10px;
`;

const StyledPodcastImage = styled.Image`
  height: 60px;
  width: 80px;
  margin-top: 4px;
  margin-left: auto;
  margin-right: auto;
`;


interface Props extends PodcastType {
  navigation: NavigationScreenProp<any>,
  getPodcast: (id: string)=> void
}

const TrimText = (text:string) => {
    return text.substr(0, Math.min(text.length, 50)) + "...";
  };

const PodcastItem = (props: Props) => {

  const openPodcastDetailHandle = ()=>{
    console.log('check presseed ok ')
    props.getPodcast(props.id)
    props.navigation.navigate("PodcastDetail")
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
            {props.narrator}
          </DescriptionSub>
        </StyledPodcastContent>

      </StyledPodcastWrapper>
    </TouchableOpacity>
  );
};


function mapStateToProps (state: any) {
  return {
  }
}



function mapDispatchToProps (dispatch: any) {
  return {
    getPodcast: (id:string)=> dispatch(getPodcast(id))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(PodcastItem);
