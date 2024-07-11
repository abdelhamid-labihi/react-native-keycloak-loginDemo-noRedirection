import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './src/LoginScreen';
import HomeScreen from './src/HomeScreen';
import { AuthProvider, AuthContext } from './src/AuthContext';

type RootStackParamList = {
  Login: undefined;
  Home: { token: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    // Handle the case when authContext is undefined
    return null;
  }

  const { isAuthenticated } = authContext;

  return (
    <Stack.Navigator initialRouteName={isAuthenticated ? "Home" : "Login"}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
};

export default App;