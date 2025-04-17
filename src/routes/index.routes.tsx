import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Loading from '../pages/loading/loading'; 
import Login from "../pages/login/login";
import Home from '../pages/home/'
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

            <Stack.Screen
                name="Login"
                component={Login} 
            />

            <Stack.Screen
                name="Login"
                component={Login} 
            />

            <Stack.Screen
                name="Login"
                component={Login} 
            />

            <Stack.Screen
                name="Login"
                component={Login} 
            />

            <Stack.Screen
                name="Login"
                component={Login} 
            />
        </Stack.Navigator>
    );
}
