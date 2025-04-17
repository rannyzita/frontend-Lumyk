import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Loading from '../pages/loading/loading'; 
import Login from "../pages/login/login";
import Home from '../pages/home/home'
import OrderHistory from '../pages/orderHistory/orderHistory'
import Subscription from '../pages/subscription/subscription'
import Cart from '../pages/cart/cart'
import About from '../pages/about/about'

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
                name="Home"
                component={Home} 
            />

            <Stack.Screen
                name="OrderHistory"
                component={OrderHistory} 
            />

            <Stack.Screen
                name="Subscription"
                component={Subscription} 
            />

            <Stack.Screen
                name="Cart"
                component={Cart} 
            />

            <Stack.Screen
                name="About"
                component={About} 
            />
        </Stack.Navigator>
    );
}
