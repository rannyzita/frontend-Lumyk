import { NavigationContainer } from '@react-navigation/native';
import Routes from './src/routes/index.routes';

import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from './src/routes/types/navigation';

import { PlanoProvider } from './src/context/PlanoContext';

export default function App() {

  return (
    <NavigationContainer>
      <PlanoProvider>
        <Routes></Routes>
      </PlanoProvider>
    </NavigationContainer>
  );
};
