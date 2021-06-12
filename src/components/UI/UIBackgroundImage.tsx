import React from 'react';
import { ImageBackground } from 'react-native';
import { View } from 'react-native-animatable';
import styled from 'styled-components/native'

interface Props{
    [key:string]: any,
}

const StyledView = styled.View`
    position: relative;
    overflow: hidden;
`

const StyledImage = styled.Image`
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0 ;
    background: #f8f8f8;
`

const UIBackgroundImage = React.memo((props: Props)=>{
    return <StyledView {...props} >
        <StyledImage source = {require('@/assets/branding.jpg')}/>
        {props.children}
    </StyledView>
})

export default UIBackgroundImage;