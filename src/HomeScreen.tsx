// HomeScreen.tsx
import React from 'react';
import { View, Text } from 'react-native';
import { RouteProp } from '@react-navigation/native';

type RootStackParamList = {
  Home: { token: string };
};

type HomeScreenRouteProp = RouteProp<RootStackParamList, 'Home'>;

type Props = {
  route: HomeScreenRouteProp;
};

const HomeScreen: React.FC<Props> = ({ route }) => {
  const { token } = route.params;

  return (
    <View>
      <Text>Welcome! Your token: {token}</Text>
    </View>
  );
};

export default HomeScreen;