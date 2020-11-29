import React, {useEffect, useState} from 'react'
import {ActivityIndicator, StyleSheet, View} from 'react-native'
import firebase from 'firebase/app'

const Loading = ({navigation}) => {

    useEffect(() => {

        firebase.auth().onAuthStateChanged((user) => {
            if (user){
                navigation.replace('Dashboard')
            } else {
                navigation.replace('Home')
            }
        })
    }, []);

    return (
        <View style={styles.container} >
            <ActivityIndicator size='large' />
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    }
})

export default Loading;