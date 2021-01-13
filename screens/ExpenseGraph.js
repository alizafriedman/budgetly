import React from 'react';
import {Dimensions, View} from 'react-native';
import {PieChart} from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;
const randomColor = require('randomcolor');

const ExpenseGraph = ({expenses}) => {


const data = expenses.map((expense) => {
    const expenseData = {
        name: expense.category
    }
})

    return (
        <View>

            <PieChart
            
                data = {data}
                width={screenWidth}
                height={220}
                chartConfig={chartConfig}
                accessor={}
                backgroundColor={'transparent'}
                paddingLeft={'15'}
                avoidFalseZero={true}
            />




        </View>

    )




}




export default ExpensGraph;