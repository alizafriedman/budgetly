import React from 'react'
import { Dimensions, View, Text } from 'react-native';
import { BarChart, PieChart } from 'react-native-chart-kit';



const screenWidth = Dimensions.get('window').width;
let randomColor = require('randomcolor') 

const IncomeBarChart = ({incomes}) => {
    const chartConfig = {
        backgroundGradientFrom: "#3D2247",
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: "#A95EC6",
        backgroundGradientToOpacity: 0.5,
        fillShadowGradient: '#A95EC6',
        // color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
        strokeWidth: 2, // optional, default 3
        barPercentage: 0.5,
        useShadowColorFromDataset: false // optional
    };


    const data = incomes.map((income) => {
        const incomeData = {
            labels: [`${income.type}`],
            datasets: [
                {
                    data: [income.amount]
                }
            ],
            style: {
                color: randomColor()
            }
        }
        console.log(income.type)
        return incomeData;
        
    })

    return (
        <BarChart 
        // style={style}
            data={data}
            width={screenWidth}
            height={220}
            yAxisLabel="$"
            chartConfig={chartConfig}
            verticalLabelRotation={30}
        />
    )


}


export default IncomeBarChart;