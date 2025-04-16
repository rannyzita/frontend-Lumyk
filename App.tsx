import { NavigationContainer } from '@react-navigation/native';
import Routes from './src/routes/index.routes';
import { useFonts, Roboto_400Regular, Roboto_600SemiBold, Roboto_700Bold } from '@expo-google-fonts/roboto';
import AppLoading from 'expo-app-loading';

import './src/global/font';

export default function App() {

  // const [fontsLoaded] = useFonts({
  //   Roboto_400Regular,
  //   Roboto_600SemiBold,
  //   Roboto_700Bold,
  // });

  // if (!fontsLoaded) {
  //   return <AppLoading />;
  // }
  
  return (
    <NavigationContainer>
      <Routes></Routes>
    </NavigationContainer>
  );
}
