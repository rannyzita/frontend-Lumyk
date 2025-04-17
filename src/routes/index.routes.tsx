import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View } from 'react-native';

import HomeIcon from '../assets/iconsNavigation/Home.svg';
import OrderHistoryIcon from '../assets/iconsNavigation/Order.svg';
import SubscriptionIcon from '../assets/iconsNavigation/Subscription.svg';
import CartIcon from '../assets/iconsNavigation/Cart.svg';
import AboutIcon from '../assets/iconsNavigation/About.svg';


import Loading from '../pages/loading/loading';
import Login from '../pages/login/login';
import Home from '../pages/home/home';
import OrderHistory from '../pages/orderHistory/orderHistory';
import Subscription from '../pages/subscription/subscription';
import Cart from '../pages/cart/cart';
import About from '../pages/about/about';
import Profile from '../pages/profile/profile';
import Authors from '../pages/authors/authors';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

import {themes} from '../global/themes'


function TabNavigator() {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle: {
                    backgroundColor: themes.colors.primary,
                    borderTopWidth: 0,
                    height: 60,
                    paddingTop: 10, 
                    paddingBottom: 10 
                },
            }}
        >

            <Tab.Screen
                name='Home'
                component={Home}
                options={{                                              
                    tabBarIcon: () => <HomeIcon/>,
                }}
            />

            <Tab.Screen                                                                                                                    
                name="OrderHistory"
                component={OrderHistory}
                options={{
                    tabBarIcon: () => <OrderHistoryIcon/>,
                }}
            />

            <Tab.Screen
                name="Subscription"
                component={Subscription}
                options={{
                    tabBarIcon: () => <SubscriptionIcon/>,
                }}
            />

            <Tab.Screen
                name="Cart"
                component={Cart}
                options={{
                    tabBarIcon: () => <CartIcon/>,
                }}
            />

            <Tab.Screen
                name="About"
                component={About}
                options={{
                    tabBarIcon: () => <AboutIcon/>,
                }}
            />
        </Tab.Navigator>
    );
}

export default function Routes() {
    return (
        <Stack.Navigator
            initialRouteName="Loading"
            screenOptions={{
                headerShown: false,
                cardStyle: {
                    backgroundColor: '#fff',
                },
                animation: 'none',
            }}
        >

            <Stack.Screen name="Loading" component={Loading} />
            <Stack.Screen name="Login" component={Login} />

            {/* Aqui, o TabNavigator vai ser exibido entre Home e About */}
            <Stack.Screen name="Main" component={TabNavigator} />

            <Stack.Screen name="Profile" component={Profile} />

            <Stack.Screen name="Authors" component={Authors} />
        </Stack.Navigator>
    );
}
