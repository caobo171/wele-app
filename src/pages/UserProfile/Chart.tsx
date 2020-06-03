import React, { useContext } from 'react'

import { LineChart } from 'react-native-chart-kit'
import { Dimensions } from 'react-native'
import { useTheme } from '@/store/theme/hook'
import { ThemeContext } from 'styled-components'
import { ThemeMode } from '@/store/theme/ThemeWrapper'

interface Props {
    results: {
        labelArray: any[],
        totalArray: any[]
    }
}

const WIDTH = Dimensions.get("window").width

const ProfileChart = React.memo((props: Props) => {

    const theme = useContext(ThemeContext)
    const themeMode = useTheme()

    const labelColor = themeMode === ThemeMode.LIGHT ?`rgba(0, 0, 0, 0.7)` : `rgba(255, 255,255, 0.7)`

    const lineColor = themeMode === ThemeMode.LIGHT ?`rgba(0, 0, 0, 0.4)` : `rgba(255, 255,255, 0.4)`
    return <LineChart

        data={{
            labels: props.results.labelArray,
            datasets: [
                {
                    data: props.results.totalArray
                }
            ]
        }}
        width={WIDTH} // from react-native
        height={220}
        yAxisLabel={""}
        yAxisSuffix={""}
        chartConfig={{
            backgroundColor: theme.backgroundColor,
            backgroundGradientFrom: theme.backgroundColor,
            backgroundGradientTo: theme.backgroundColor,

            decimalPlaces: 2, // optional, defaults to 2dp
            color: (opacity = 0.7) => lineColor,
            //@ts-ignore
            labelColor: (opacity = 1) => labelColor,
            style: {
                borderRadius: 16,
                color: theme.textColorH1
            },
            propsForDots: {
                r: "2",
                strokeWidth: "1",
                stroke: "#ffa726"
            }
        }}
        bezier={true}
        style={{
            marginVertical: 8,
            borderRadius: 16,
            margin: 'auto',
            color: theme.textColorH1
        }}
    />
},(prev,next)=> prev.results === next.results)

export default ProfileChart ;
