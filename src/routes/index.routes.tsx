import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from '@react-navigation/native';
import Loading from '../pages/loading/loading'; 
import Login from "../pages/login/login";

export default function Routes() {
    const Stack = createStackNavigator();

    return (
        <Stack.Navigator
            initialRouteName="Loading"
            screenOptions={{
                headerShown: false,
                cardStyle: {
                    backgroundColor: '#fff'
                }
            }}
        >

        <Stack.Screen
            name="Loading"
            component={Loading} 
        />

        <Stack.Screen
            name="Login"
            component={Login} 
        />
        </Stack.Navigator>
    );
}
