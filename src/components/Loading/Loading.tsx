import React from "react";
import styled from "styled-components/native";
import {CustomTheme, ThemeMode} from '@store/theme/ThemeWrapper'

const StyledLoading = styled.ActivityIndicator`
  color: #0000ff;
  font-size: 80px;
  font-weight: 800;
`;

const StyledWrapper = styled.View<{theme: CustomTheme}>`
  height: 100%;
  width: 100%;
  align-items: center;
  justify-content: center;
  background-color: ${props=> props.theme.backgroundColor};

`;
const LoadingComponent = () => {
  return (
    <StyledWrapper>
      <StyledLoading  size={'large'}/>
    </StyledWrapper>
  );
};

export default LoadingComponent; 
