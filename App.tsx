import { NavigationContainer } from '@react-navigation/native';
import Routes from './src/routes/index.routes';
import { RedefinirSenhaProvider } from './src/context/RedefinirSenhaContext';
export default function App() {

  return (
    <RedefinirSenhaProvider>
      <NavigationContainer>
        <Routes></Routes>
      </NavigationContainer>
    </RedefinirSenhaProvider>
  );
};
