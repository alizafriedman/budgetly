import React from 'react';
import {PieChart} from 'react-native-chart-kit';
import Income from './Income';




const IncomeGraph = ({type, amount}) => {

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
        type: 'type',
        amount: 324,
        color: '#661327',
        legendFontColor: '#661327',
        legendFontSize: 15
    },
     {
        type: 'type',
        amount: 7564,
        color: '#661327',
        legendFontColor: '#661327',
        legendFontSize: 15
    }
]
console.log(amount)
return (
        <PieChart
            data={data}
            width={100}
            height={100}
            chartConfig={chartConfig}
            accessor={amount}
        backgroundColor={'#661327'}
            // paddingLeft={}
            // center={}
            absolute
        />

    )
}



export default IncomeGraph;