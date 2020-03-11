import styled from 'styled-components/native';
import React from 'react';
import {getStatusBarHeight, isIphoneX} from 'react-native-iphone-x-helper';
import {memo, useContext, useEffect, useMemo} from 'react';
import { Platform } from 'react-native';
import {CustomTheme } from '@/store/theme/ThemeWrapper'

const StyledView = styled.View<{ theme: CustomTheme }>`
    height: ${isIphoneX() ? getStatusBarHeight(true) : Platform.select({
        ios: 20,
        default: 0
    })}px;
    background-color: ${props=> props.theme.backgroundColor}
`
const StatusBarView = memo(()=>{
    return <StyledView/>
})

export default StatusBarView;