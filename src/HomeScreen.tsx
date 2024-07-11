import React from 'react';
import { View, Text, SafeAreaView, StyleSheet, StatusBar } from 'react-native';
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
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.content}>
        <Text style={styles.welcomeText}>Welcome!</Text>
        <Text style={styles.tokenText}>Your token: {token}</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F0F8FF',
  },
  content: {
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 3, // Shadow for Android
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#333',
  },
  tokenText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
  },
});

export default HomeScreen;