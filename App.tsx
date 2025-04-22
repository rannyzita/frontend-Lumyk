import { NavigationContainer } from '@react-navigation/native';
import Routes from './src/routes/index.routes';
import { useFonts, Roboto_400Regular, Roboto_600SemiBold, Roboto_700Bold } from '@expo-google-fonts/roboto';
import AppLoading from 'expo-app-loading';

export default function App() {
  
  return (
<<<<<<< HEAD
    <View style={styles.container}>
      <Text>Laura! fluflu</Text>
      <FontAwesomeIcon icon={faCircleUser} size={32} color="black" />
      <StatusBar style="auto" />
    </View>
=======
    <NavigationContainer>
      <Routes></Routes>
    </NavigationContainer>
>>>>>>> be4db9eb73db0fbcf1d8d858bf36556bf6fdb41d
  );
}
