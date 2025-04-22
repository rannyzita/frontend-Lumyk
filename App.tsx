import { NavigationContainer } from '@react-navigation/native';
import Routes from './src/routes/index.routes';
import { useFonts, Roboto_400Regular, Roboto_600SemiBold, Roboto_700Bold } from '@expo-google-fonts/roboto';
import AppLoading from 'expo-app-loading';

export default function App() {
  
  return (
    <NavigationContainer>
      <Routes></Routes>
    </NavigationContainer>
  );
}
