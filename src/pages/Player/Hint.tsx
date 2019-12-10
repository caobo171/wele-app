import React from 'react'
import styled from 'styled-components/native'

const StyldView = styled.ScrollView`

    width: 100%;
    background-color: #fff;
    padding: 10px;
`

const StyledText = styled.Text`
    margin-top: 16px;
    font-size: 18px;
    margin-bottom: 32px;
`

interface Props{
    hint: string | undefined 
}

const validdateHint = (hint: string)=>{
    return hint.replace(/&#39;/g,`'`).replace(/&quot;/g,`"`)
}

const Hint = (props: Props) => {

    console.log('check ', props.hint)

    return (<StyldView>
        <StyledText>{validdateHint(props.hint)}</StyledText>
    </StyldView>)
}

export default Hint