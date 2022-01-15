import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screen/HomeScreen';
import NewPostScreen from './screen/NewPostScreen'
import LoginScreen from './screen/LoginScreen';
import SignupScreen from './screen/SignupScreen';
import CameraScreen from './screen/CameraScreen';


const Stack = createStackNavigator()

const screenOptions = {
    headerShown: false,
}

export const SignedInStack = () => (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName='HomeScreen'
                screenOptions={screenOptions}
            >
                <Stack.Screen name='HomeScreen' component={HomeScreen}/>
                <Stack.Screen name='NewPostScreen' component={NewPostScreen}/>
                <Stack.Screen name='CameraScreen' component={CameraScreen}/>
            </Stack.Navigator>
        </NavigationContainer>
)

export const SignedOutStack = () => (
    <NavigationContainer>
            <Stack.Navigator
                initialRouteName='LoginScreen'
                screenOptions={screenOptions}
            >
                <Stack.Screen name='LoginScreen' component={LoginScreen}/>
                <Stack.Screen name='SignupScreen' component={SignupScreen}/>
            </Stack.Navigator>
        </NavigationContainer>
)
