import React, { useState, useEffect } from 'react'
import { View, ScrollView, FlatList, StyleSheet} from 'react-native'
import { TextInput, Button, List, Dialog, Portal,Provider } from 'react-native-paper'
import firebase from 'firebase/app'
import {db} from '../api/auth'
import NavBar from './NavBar'
import UpdateGoals from './UpdateGoals'
import DeleteGoal from './DeleteGoal'
import GoalsGraph from './GoalsGraph'

const Goals = ({navigation, route}) => {
    const {goals, goalRef} = route.params

    const [goalName, setGoalName] = useState('')
    const [projectedAmount, setProjectedAmount] = useState('')
    const [description, setDescription] = useState('')
    const [timeframe, setTimeframe] = useState('');
    const [visible, setVisible] = useState(false)


    const addGoals = async () => {
        setVisible(false)

        await goalRef.add({
            goalName: goalName,
            projectedAmount: parseInt(projectedAmount),
            description: description,
            timeframe: parseInt(timeframe),

        });
        setGoalName('')
        setProjectedAmount('')
        setDescription('')
        setTimeframe('')
    }

  console.log(goals)
    
    const DisplayGoals = ({ goalId, goalName, projectedAmount, description, timeframe}) => {
        
        return (
            <View>
                <ScrollView showsHorizontalScrollIndicator={true}
                    scrollEnabled={true}
                >
                <List.AccordionGroup>
                    <List.Accordion title={`Goal Name: ${goalName}`} id="1" >
                        <List.Item title={`Projected Amount: $${projectedAmount}`} />
                        <List.Item title={`Description: ${description}`} />
                        <List.Item title={`Timeframe: ${timeframe}`} />
                        
                        <UpdateGoals 
                            goalName={goalName}
                            projectedAmount={projectedAmount} 
                            description={description} 
                            timeframe = {timeframe}
                            goalId={goalId}
                            key={goalId}
                            goalRef={goalRef}
                          />
                           
                        <DeleteGoal 
                            goalId={goalId}
                            goalRef={goalRef} 
                        />
                               
                                
                </List.Accordion>
                </List.AccordionGroup>
                </ScrollView>
            </View>
        )
    }


    return (
    
            <ScrollView 
            showsHorizontalScrollIndicator={true}
            >
                <NavBar navigation={navigation} />

                <GoalsGraph goals={goals} />
                <FlatList 
                style={{ flex: 1 }}
                data={goals}
                keyExtractor={(item) => item.goalId}
                renderItem={({item}) => <DisplayGoals {...item} />}

                 />



                {visible && 
                <Provider>
                    <ScrollView style={styles.modal}>
                        <Portal>
                            <Dialog visible={visible} > 
                                <Dialog.Title>add new goal</Dialog.Title>
                                <Dialog.Content>
                                    <TextInput label={'Goal'} value={goalName} onChangeText={setGoalName} />
                                    <TextInput label={'projected amount'} value={projectedAmount} onChangeText={setProjectedAmount} />
                                    <TextInput label={'description '} value={description} onChangeText={setDescription} />
                                    <TextInput label={'time frame'} value={timeframe} onChangeText={setTimeframe} />
                                </Dialog.Content>
                                <Dialog.Actions>
                                    <Button onPress={() => addGoals()}>Add Goals</Button>
                                </Dialog.Actions>
                            </Dialog>
                        </Portal>
                </ScrollView> 
            </Provider>
                }
         <Button onPress={() => setVisible(true)} > add goals</Button>
    </ScrollView>

    )
}

const styles = StyleSheet.create({
    modal: {
        marginTop: "80%"
    },
})


export default Goals;