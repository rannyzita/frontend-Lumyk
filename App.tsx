import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Routes from './src/routes/index.routes';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Routes></Routes>
    </NavigationContainer>
  );
}
