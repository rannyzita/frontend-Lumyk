import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Importando os arquivos SVG diretamente
import HomeIcon from '../assets/icons/home.svg';
import OrderHistoryIcon from '../assets/icons/order-history.svg';
import SubscriptionIcon from '../assets/icons/subscription.svg';
import CartIcon from '../assets/icons/cart.svg';
import AboutIcon from '../assets/icons/about.svg';

// Importando as páginas
import Loading from '../pages/loading/loading';
import Login from '../pages/login/login';
import Home from '../pages/home/home';
import OrderHistory from '../pages/orderHistory/orderHistory';
import Subscription from '../pages/subscription/subscription';
import Cart from '../pages/cart/cart';
import About from '../pages/about/about';
import Profile from '../pages/profile/profile';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Navegação com Bottom Tabs para Home, OrderHistory, Subscription, Cart e About
function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopWidth: 0,
        },
      }}
    >
      <Tab.Screen
        name="Home"
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

      {/* O restante continua no StackNavigator */}
      <Stack.Screen name="Profile" component={Profile} />
    </Stack.Navigator>
  );
}
