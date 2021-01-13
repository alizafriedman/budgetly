import React from 'react';
import {Dimensions, View} from 'react-native'
import {BarChart} from 'react-native-chart-kit'
import graphStyle from 'react-native-svg'



const screenWidth = Dimensions.get('window').width;
const randomColor = require('randomcolor') 



const ExpensesBarChart = ({expenses}) => {

    if (!expenses.length) {
        return null;
    } 

    const chartConfig = {
        backgroundGradientFrom: "#3D2247",
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: "#A95EC6",
        backgroundGradientToOpacity: 0.5,
        fillShadowGradient: '#A95EC6',
        // color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
                color: (opacity = 1) => randomColor() `${opacity})`,

        strokeWidth: 2, // optional, default 3
        barPercentage: 0.5,
        useShadowColorFromDataset: false // optional
    };

    const data = expenses.map((expense) => {
        const expenseData = {
            labels: ['apple', expense.category],
            datasets: [
                {
                    data: [10,20,30],
                }
            ],
        }

        return expenseData
    })

    // const graphStyle = '#A95EC6'
    

    console.log(expenses)
    return (
        <View>
            <BarChart 
                style={color=randomColor()}
                data={data}
                width={screenWidth}
                height={220}
                yAxisLabel="$"
                chartConfig={chartConfig}
                verticalLabelRotation={30}
                backgroundColor={'transparent'}

            />
        </View>
    )

}



export default ExpensesBarChart; 