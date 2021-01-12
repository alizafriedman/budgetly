import React from 'react';
import {Dimensions, View, Text} from 'react-native';
import {PieChart} from 'react-native-chart-kit';



const screenWidth = Dimensions.get('window').width;


const IncomeGraph = ({incomes}) => {

    const chartConfig = {
        backgroundGradientFrom: "#3D2247",
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: "#A95EC6",
        backgroundGradientToOpacity: 0.5,
        color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
        strokeWidth: 2, // optional, default 3
        barPercentage: 0.5,
        useShadowColorFromDataset: false // optional
    };




const data = incomes.map((income) => {
    const incomeData = {
        type: income.type,
        amount: income.amount,
        color: '#3D2247',
        legendFontColor: '#A95EC6',
        legendFontSize: 15
    }
   
    return incomeData;

});


console.log(data)
return (
    <View>
        <PieChart
        data={data}
        width={screenWidth}
        height={220}
        chartConfig={chartConfig}
        accessor={'amount'}
        backgroundColor={'transparent'}
        paddingLeft={'15'}
        // center={[10,50]}
        absolute
         />
    </View>
)
}


export default IncomeGraph;