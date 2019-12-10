import React, { useContext } from "react";
import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";

import EntypoIcon from "react-native-vector-icons/Entypo";
import { NavigationContext } from "react-navigation";

const HeaderWrapper = styled.View`
  background-color: white;
  height: 32px;
  flex-direction: row;
  justify-content: flex-start;
  padding: 0;
  align-items: center;
`;

const StyledAntEntypoIcon = styled(EntypoIcon)`
  font-size: 16px;
  color: #a8a8a8;
  margin: 8px 10px 8px 10px;
`;

const StyledHeaderText = styled.Text`
  margin: auto;
`;


const Header = () => {

  const nav = useContext(NavigationContext)
  return (
    <HeaderWrapper>
      <TouchableOpacity
        onPress={() => {
          nav.navigate("PodcastDetail");
        }}
      >
        <StyledAntEntypoIcon name={"chevron-thin-down"} />
      </TouchableOpacity>
      <StyledHeaderText>We EnJoy Learning English</StyledHeaderText>

      <TouchableOpacity
        onPress={() => {
          nav.navigate("Home");
        }}
      >
        <StyledAntEntypoIcon name={"dots-three-vertical"} />
      </TouchableOpacity>
    </HeaderWrapper>
  );
};

export default Header;
