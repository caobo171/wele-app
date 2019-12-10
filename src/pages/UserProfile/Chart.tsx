import React from 'react'

import { LineChart } from 'react-native-chart-kit'
import { Dimensions } from 'react-native'

interface Props {
    results: {
        labelArray: any[],
        totalArray: any[]
    }
}

const WIDTH = Dimensions.get("window").width

const ProfileChart = (props: Props) => {
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
            backgroundColor: "#ffffff",
            backgroundGradientFrom: "#ffffff",
            backgroundGradientTo: "#ffffff",

            decimalPlaces: 2, // optional, defaults to 2dp
            color: (opacity = 0.7) => `rgba(0, 0, 0, ${opacity})`,
            //@ts-ignore
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: {
                borderRadius: 16,

            },
            propsForDots: {
                r: "2",
                strokeWidth: "1",
                stroke: "#ffa726"
            }
        }}
        bezier
        style={{
            marginVertical: 8,
            borderRadius: 16,
            margin: 'auto'
        }}
    />
}

export default ProfileChart ;
