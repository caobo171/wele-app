import styled from "styled-components/native";
import {memo, PropsWithChildren} from 'react';
import {
    Platform,
    TouchableHighlightProps,
    TouchableNativeFeedback, TouchableNativeFeedbackProps, View,
} from 'react-native';
import * as React from 'react';

const THighLight = styled.TouchableHighlight``;

const Touchable = memo(({children, onPress, onLongPress, ...props}: PropsWithChildren<TouchableHighlightProps & TouchableNativeFeedbackProps>) => {
    if (Platform.OS === 'android') {
        return <TouchableNativeFeedback onPress={onPress} onLongPress={onLongPress}>
            <View {...props}>{children}</View>
        </TouchableNativeFeedback>
    }

    return <THighLight onPress={onPress} onLongPress={onLongPress} {...props}>
        <>{children}</>
    </THighLight>
});

export default Touchable;