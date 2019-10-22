import React from 'react'
import { View , Text, Alert } from 'react-native'
import styled from "styled-components/native"
import useEffectOnce from 'react-use/lib/useEffectOnce'


const StyledText = styled.Text`

    height: 50px;
    background-color: red;
    width: 100px;
`

const StyledView = styled.View`

height: 50px;
background-color: red;
width: 100px;
`
const Wrapper = styled.View`
height: 100%;
width: 100%;
`

const PlayerThumbnail = (props:any)=>{
    useEffectOnce(()=>{
        Alert.alert('test')
    })
    return(
        <Wrapper>
            {props.children}
            <StyledView/>
        </Wrapper>
    )
}


export default PlayerThumbnail;