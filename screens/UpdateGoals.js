import React, {useState, useEffect} from 'react'
import {TouchableOpacity, View, ScrollView} from 'react-native'
import {Button, Dialog,Portal, Provider, TextInput} from 'react-native-paper'
import firebase from 'firebase/app'
import {db} from '../api/auth'



const UpdateGoals = ({docId, goalName, projectedAmount, description, timeframe}) => {
    const [visible, setVisible] = useState(false)
    const [updateGoalName, setUpdateGoalName] = useState(goalName)
    const [updateProjAmount, setUpdateProjAmount] = useState(projectedAmount)
    const [updateDescription, setUpdateDescription] = useState(description)
    const [updateTimeframe, setUpdateTimeframe] = useState(timeframe)


    const showDialog = () =>  setVisible(true)
    const hideDialog = () =>  setVisible(false)

    const userId = firebase.auth().currentUser.uid
    const ref = db.collection(`users/${userId}/goals`)


    const submitEdits = async () => {
        await ref.doc(docId).set({
            goalName: updateGoalName,
            projectedAmount: parseInt(updateProjAmount),
            description: updateDescription,
            timeframe: parseInt(updateTimeframe)
        });
        hideDialog()
        setVisible(false)
    }



    return (
        <Provider>
            <ScrollView>
                <Button onPress={showDialog}> edit here</Button>
                <Portal>
                    <Dialog visible={visible} >
                        <Dialog.Title>update goalssssss</Dialog.Title>
                        <Dialog.Content>
                            <TextInput label={'goal name'} editable={true} value={updateGoalName} onChangeText={setUpdateGoalName} />
                            <TextInput label={'projected amount'} editable={true} value={updateProjAmount} onChangeText={setUpdateProjAmount} />
                            <TextInput label={'description'} editable={true} value={updateDescription} onChangeText={setUpdateDescription} />
                            <TextInput label={'timeframe'} editable={true} value={updateTimeframe} onChangeText={setUpdateTimeframe} />
                        
                        <Dialog.Actions>
                            <Button onPress={submitEdits} >submit edit</Button>
                        </Dialog.Actions>
                        </Dialog.Content>   

                    </Dialog>
                </Portal>
            </ScrollView>
        </Provider>
    )



}



export default UpdateGoals;