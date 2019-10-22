import React from "react";
import styled from "styled-components/native";

const StyledLoading = styled.ActivityIndicator`
  color: #0000ff;
  font-size: 40px;
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
      <StyledLoading />
    </StyledWrapper>
  );
};

export default LoadingComponent; 
