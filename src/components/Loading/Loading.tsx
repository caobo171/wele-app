import React from "react";
import styled from "styled-components/native";

const StyledLoading = styled.ActivityIndicator`
  color: #0000ff;
  font-size: 80px;
  font-weight: 800;
`;

const StyledWrapper = styled.View`
  height: 100%;
  width: 100%;
  align-items: center;
  justify-content: center;
`;
const LoadingComponent = () => {
  return (
    <StyledWrapper>
      <StyledLoading  size={'large'}/>
    </StyledWrapper>
  );
};

export default LoadingComponent; 
