import React, { useState, useEffect } from 'react'
import { View, Appbar, ScrollView, FlatList} from 'react-native'
import { TextInput, Button, List } from 'react-native-paper'
import firebase from 'firebase/app'
import {db} from '../api/auth'




const Goals = ({navigation}) => {
    const [goals, setGoals] = useState([])
    const [goalName, setGoalName] = useState('')
    const [projectedAmount, setProjectedAmount] = useState('')
    const [description, setDescription] = useState('')
    const [timeframe, setTimeframe] = useState('')
    const [loading, setLoading] = useState(true)

    const userId = firebase.auth().currentUser.uid
    const ref = db.collection(`users/${userId}/goals`)


    useEffect(() => {
        return ref.onSnapshot((querySnapshot) => {
            const goalsList = []
            querySnapshot.forEach(doc => {
                const { goalName, projectedAmount, description, timeframe } = doc.data();
                goalsList.push({
                    id: doc.id,
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
        await ref.add({
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


    return (
        <>
            <View>

                {( <>{goals.map((goal) => {
                    <List.AccordionGroup>
                        <List.Accordion title={`Goal Name: ${goalName}`} id="1" >
                            <List.Item title={`Projected Amount: ${projectedAmount}`} />
                            <List.Item title={`Description: $${description}`} />
                            <List.Item title={`Timeframe: ${timeframe}`} />
                        </List.Accordion>
                    </List.AccordionGroup>
                })}  </>)}



                <ScrollView>
                    <TextInput label={'Goal'} value={goalName} onChangeText={setGoalName} />
                    <TextInput label={'projected amount '} value={projectedAmount} onChangeText={setProjectedAmount} />
                    <TextInput label={'description '} value={description} onChangeText={setDescription} />
                    <TextInput label={'time frame'} value={timeframe} onChangeText={setTimeframe} />

                    <Button onPress={() => addGoals()}>Add Goals</Button>
                </ScrollView>
            </View>
        </>
    )
}



export default Goals;