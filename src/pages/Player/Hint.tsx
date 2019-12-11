import React from 'react'
import styled from 'styled-components/native'
import {CustomTheme, ThemeMode} from '@store/theme/ThemeWrapper'

const StyldView = styled.ScrollView<{theme: CustomTheme}>`
    background-color: ${props=> props.theme.backgroundColor};
    width: 100%;
    padding: 10px;
`

const StyledText = styled.Text<{theme: CustomTheme}>`
    margin-top: 16px;
    font-size: 18px;
    margin-bottom: 32px;
    color: ${props=> props.theme.textColorH1};
`

interface Props{
    hint: string | undefined 
}

const validdateHint = (hint: string)=>{
    return hint.replace(/&#39;/g,`'`).replace(/&quot;/g,`"`)
}

const Hint = (props: Props) => {

    return (<StyldView>
        <StyledText>{validdateHint(props.hint)}</StyledText>
    </StyldView>)
}

export default Hint