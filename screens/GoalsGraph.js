import React from 'react';
import {Dimensions, View} from 'react-native';
import {PieChart} from 'react-native-chart-kit';



const screenWidth = Dimensions.get('window').width;
const randomColor = require('randomcolor');



const GoalsGraph = ({goals}) => {

    const chartConfig = {
        backgroundGradientFrom: "#3D2247",
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: "#A95EC6",
        backgroundGradientToOpacity: 0.5,
        fillShadowGradient: '#A95EC6',
        color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
        strokeWidth: 2, // optional, default 3
        barPercentage: 0.5,
        useShadowColorFromDataset: false // optional
    };




    const data = goals.map((goal) => {
        const goalData = {
            name: goal.goalName,
            amount: goal.projectedAmount,
            color: randomColor(),
            legendFontColor: '#A95EC6',
            legendFontSize: 17
        }

        return goalData;
    });



    return (
        <View>
            <PieChart 
                data={data}
                width={screenWidth}
                height={220}
                chartConfig={chartConfig}
                accessor={'amount'}
                backgroundColor={'transparent'}
                paddingLeft={'10'}
                avoidFalseZero={true}
            
            />
        </View>
    )
}




export default GoalsGraph;