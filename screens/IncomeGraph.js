import React from 'react';
import {PieChart} from 'react-native-chart-kit';
import Income from './Income';
import { Dimensions, View } from "react-native";
const screenWidth = Dimensions.get("window").width;



const IncomeGraph = ({incomes}) => {

    const chartConfig = {
        backgroundGradientFrom: "#1E2923",
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: "#08130D",
        backgroundGradientToOpacity: 0.5,
        color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
        strokeWidth: 2, // optional, default 3
        barPercentage: 0.5,
        useShadowColorFromDataset: false // optional
    };

const data = [
    {
        // type: `${type}`,
        type: 'type',
        misc: 234,
        color: '#661327',
        legendFontColor: '#1E2923"',
        legendFontSize: 15
    },
     {
        type: 'type',
        misc: 234,
         color: '#B3576D',
         legendFontColor: '#1E2923"',
        legendFontSize: 15
    }
]


    // const data = 
    //     incomes.map((income) => {
    //     type: `${type}`;
    //     amount: `${amount}`;
    //     color: '#B3576D';
    //      legendFontColor: '#1E2923"';
    //     legendFontSize: 15
    //     })
    

console.log(incomes)
return (

<View>
        <PieChart
            data={data}
            width={screenWidth}
            height={100}
            chartConfig={chartConfig}
            accessor={'misc'}
        backgroundColor={'transparent'}
            paddingLeft={'15'}
            center={[10,50]}
            absolute
        />
    </View>

    )
}



export default IncomeGraph;