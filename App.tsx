import { NavigationContainer } from '@react-navigation/native';
import Routes from './src/routes/index.routes';

import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from './src/routes/types/navigation';

type NavigationProps = StackNavigationProp<RootStackParamList>;

export default function App() {

  return (
    <NavigationContainer>
      <Routes></Routes>
    </NavigationContainer>
  );
};
