import React, { useState, useEffect } from 'react'
import { View, Appbar, ScrollView, FlatList, Pressable, Text} from 'react-native'
import { TextInput, Button, List, Dialog, Portal,Provider } from 'react-native-paper'
import firebase from 'firebase/app'
import {db} from '../api/auth'
import NavBar from './NavBar'
import UpdateGoals from './UpdateGoals'
import DeleteGoal from './DeleteGoal'


const Goals = ({navigation}) => {
    const [goals, setGoals] = useState([])
    const [goalName, setGoalName] = useState('')
    const [projectedAmount, setProjectedAmount] = useState('')
    const [description, setDescription] = useState('')
    const [timeframe, setTimeframe] = useState('');
    const [visible, setVisible] = useState(false)

    const userId = firebase.auth().currentUser.uid
    const goalRef = db.collection(`users/${userId}/goals`)


    useEffect(() => {
        return goalRef.onSnapshot((querySnapshot) => {
            const goalsList = []
            querySnapshot.forEach(doc => {
                const { goalName, projectedAmount, description, timeframe } = doc.data();
                goalsList.push({
                    goalId: doc.id,
                    goalName,
                    projectedAmount,
                    description,
                    timeframe
                });
            });
            setGoals(goalsList)
        })
    }, [])


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

  


    
    const DisplayGoals = ({userId, goalId, goalName, projectedAmount, description, timeframe}) => {
        
        return (
            <View>
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
                          />
                           
                        <DeleteGoal goalId={goalId} userId={userId} />
                               
                                
                </List.Accordion>
                </List.AccordionGroup>
            </View>
        )
    }


    //data.forEach item.id
    return (
    
                <ScrollView>
                <NavBar navigation={navigation} />
                <Button onPress={() => setVisible(true)} > add goals</Button>

                <FlatList 
                style={{ flex: 1 }}
                data={goals}
                keyExtractor={(item) => item.id}
                renderItem={({item}) => <DisplayGoals {...item} />}

                 />



                {visible && 
                <Provider>
                    <ScrollView>
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
    </ScrollView>

    )
}



export default Goals;