import React, { useState, useEffect } from 'react'
import { View, Appbar, ScrollView, FlatList} from 'react-native'
import { TextInput, Button, List, Dialog, Portal,Provider } from 'react-native-paper'
import firebase from 'firebase/app'
import {db} from '../api/auth'
import NavBar from './NavBar'
import UpdateGoals from './UpdateGoals'


const Goals = ({navigation}) => {
    const [goals, setGoals] = useState([])
    const [goalName, setGoalName] = useState('')
    const [projectedAmount, setProjectedAmount] = useState('')
    const [description, setDescription] = useState('')
    const [timeframe, setTimeframe] = useState('')
    const [docId, setDocId] = useState([])
    const [loading, setLoading] = useState(true)
    const [visible, setVisible] = useState(false)

    // const userId = firebase.auth().currentUser.uid
    const ref = db.collection(`users/${userId}/goals`)


    useEffect(() => {
        return ref.onSnapshot((querySnapshot) => {
            const goalsList = []
            const docuId = []
            querySnapshot.forEach(doc => {
                const { goalName, projectedAmount, description, timeframe } = doc.data();
                docuId.push(doc.id)
                goalsList.push({
                    id: doc.id,
                    goalName,
                    projectedAmount,
                    description,
                    timeframe
                });
            });
            setDocId(docuId)
            setGoals(goalsList)

        })
    }, [])


    const addGoals = async () => {
        setVisible(false)

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

  

    const deleteGoal = async () => {
        console.log(docId[id])
        await ref.doc(docId).delete();

    }

    
    const DisplayGoals = ({docId, goalName, projectedAmount, description, timeframe}) => {
        return (
            <View>
                <List.AccordionGroup>
                    <List.Accordion title={`Goal Name: ${goalName}`} id="1" >
                        <List.Item title={`Projected Amount: $${projectedAmount}`} />
                        <List.Item title={`Description: ${description}`} />
                        <List.Item title={`Timeframe: ${timeframe}`} />
                        
                        <UpdateGoals 
                        docId={docId} 
                        goalName={goalName}
                         projectedAmount={projectedAmount} 
                         description={description} 
                         timeframe = {timeframe} />
                        <View>
                            <Button onPress={(docId) => deleteGoal(docId)} >delete</Button>
                        </View>
                </List.Accordion>
                </List.AccordionGroup>
            </View>
        )
    }

    return (
    
                <ScrollView>
                <NavBar navigation={navigation} />
                <Button onPress={() => setVisible(true)} > add goals</Button>

                <FlatList 
                style={{ flex: 1 }}
                data={goals}
                keyExtractor={(item) => item.id}
                renderItem={({item}) => <DisplayGoals {...item} docId={docId}  />}

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