import { StatusBar } from 'expo-status-bar';
import React from 'react';
import firebase from 'firebase/app';
import { StyleSheet, Text, View } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import apiKey from './config/keys';
import WelcomeScreen from './screens/WelcomeScreen';
import SignUp from './screens/SignUp'
import SignIn from './screens/SignIn'
import Loading from './screens/Loading'
import Dashboard from './screens/Dashboard'
import Expenses from './screens/Expenses'
import Goals from './screens/Goals'
import Income from './screens/Income'
import NavBar from './screens/NavBar'

const Stack = createStackNavigator();


export default function App() {

  return (
   <NavigationContainer>
     <Stack.Navigator>
       <Stack.Screen name={'Loading'} component={Loading} options={{headerShown: false }}    />
        <Stack.Screen name={'Nav'} component={NavBar} />
        <Stack.Screen name={'Home'} component={WelcomeScreen} options={{ headerShown: false }} /> 
        <Stack.Screen name={'Sign Up'} component={SignUp} options={{ headerShown: false }} /> 
        <Stack.Screen name={'Sign In'} component={SignIn} options={{ headerShown: false }} /> 
        <Stack.Screen name={'Dashboard'} component={Dashboard} options={{ headerShown: false }} />
        <Stack.Screen name={'Expenses'} component={Expenses} options={{headerShown:false}} />
        <Stack.Screen name={'Goals'} component={Goals} options={{headerShown:false}} />
        <Stack.Screen name={'Income'} component={Income} options={{ headerShown: false }} />
     </Stack.Navigator>
   </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
