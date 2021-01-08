import React, {useState} from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {Button, Dialog,Portal, Provider, TextInput} from 'react-native-paper';


const UpdateGoals = ({goalId, goalName, projectedAmount, description, timeframe, goalRef}) => {
    const [visible, setVisible] = useState(false);
    const [updateGoalName, setUpdateGoalName] = useState(goalName);
    const [updateProjAmount, setUpdateProjAmount] = useState(projectedAmount);
    const [updateDescription, setUpdateDescription] = useState(description);
    const [updateTimeframe, setUpdateTimeframe] = useState(timeframe);


    const showDialog = () =>  setVisible(true);


    const submitEdits = async () => {
        setVisible(false)
        await goalRef.doc(goalId).set({
            goalName: updateGoalName,
            projectedAmount: parseInt(updateProjAmount),
            description: updateDescription,
            timeframe: parseInt(updateTimeframe)
        });
    }



    return (
        <>
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
                        
                            <Button style={styles.button} onPress={submitEdits} >submit edit</Button>
                        </Dialog.Content>  
                        <Dialog.Actions>
                    </Dialog.Actions>
                    </Dialog>
                </Portal>
            </ScrollView>
        </Provider>
        </>
    )
}

const styles = StyleSheet.create({

    button: {
        backgroundColor: '#3D2247',
        marginLeft: 15,
        marginRight: 15,
        marginBottom: 10,
        minHeight: 50,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: 'center',
        minWidth: 100,
        height: 8,
        zIndex: 100

    },


})


export default UpdateGoals;