import React, { useContext, useCallback } from "react";
import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import {CustomTheme, ThemeMode} from '@store/theme/ThemeWrapper'
import EntypoIcon from "react-native-vector-icons/Entypo";
import { NavigationContext } from "react-navigation";

const HeaderWrapper = styled.View`
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

const StyledHeaderText = styled.Text<{theme: CustomTheme}>`
  margin: auto;
  color: ${props=> props.theme.textColorH2};
`;


const Header = React.memo(() => {

  const nav = useContext(NavigationContext)

  const navigateHome = useCallback(()=>{
    nav.navigate("Home");
  }, [])

  const navigateToPodcastDetail = useCallback(()=>{
    nav.navigate("PodcastDetail");
  }, [])
  return (
    <HeaderWrapper>
      <TouchableOpacity
        onPress={navigateToPodcastDetail}
      >
        <StyledAntEntypoIcon name={"chevron-thin-down"} />
      </TouchableOpacity>
      <StyledHeaderText>We EnJoy Learning English</StyledHeaderText>

      <TouchableOpacity
        onPress={navigateHome}
      >
        <StyledAntEntypoIcon name={"dots-three-vertical"} />
      </TouchableOpacity>
    </HeaderWrapper>
  );
});

export default Header;
