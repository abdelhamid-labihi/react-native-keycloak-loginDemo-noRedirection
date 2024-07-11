import React, { useState } from 'react';
import { View, TextInput, Alert, StyleSheet, Text, TouchableOpacity } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import keycloakConfig from './keycloakConfig';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';

type RootStackParamList = {
  Login: undefined;
  Home: { token: string };
};

type LoginScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;
type LoginScreenRouteProp = RouteProp<RootStackParamList, 'Login'>;

type Props = {
  navigation: LoginScreenNavigationProp;
  //route: LoginScreenRouteProp;
};

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  //const [remember, setRemember] = useState(false);

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        `${keycloakConfig.issuer}/protocol/openid-connect/token`,
        new URLSearchParams({
          grant_type: 'password',
          client_id: keycloakConfig.clientId,
          client_secret: keycloakConfig.clientSecret,
          username,
          password,
        }),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      );

      const { access_token } = response.data;

      // Save the token
      await AsyncStorage.setItem('accessToken', access_token);

      // Navigate to HomeScreen
      navigation.navigate('Home', { token: access_token });
    } catch (error) {
      if (axios.isAxiosError(error) && error.response && error.response.status === 401) {
        Alert.alert('Login failed', 'Invalid credentials');
      } else {
        Alert.alert('Login failed', 'Something went wrong. Please try again later.');
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Your APP</Text>
        <Text style={styles.subtitle}>Login to your Account.</Text>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
            style={styles.input}
          />
          <Text style={styles.inputLabel}>Username</Text>
          <Text style={styles.inputRequired}>(required)</Text>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={styles.input}
          />
          <Text style={styles.inputLabel}>Password</Text>
          <Text style={styles.inputRequired}>(required)</Text>
        </View>
        <View style={styles.checkboxContainer}>
          {/* <CheckBox
            value={remember}
            onValueChange={setRemember}
            tintColors={{ true: '#4a90e2', false: '#ccc' }}
            style={styles.checkbox}
          /> */}
          <Text style={styles.checkboxLabel}>Remember this account</Text>
        </View>
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>SIGN IN</Text>
        </TouchableOpacity>
        <View style={styles.footer}>
          <TouchableOpacity style={styles.footerLink}>
            <Text style={styles.footerText}>Forgot Password?</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.footerLink}>
            <Text style={styles.footerText}>Create Account</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '90%',
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: '800',
    marginBottom: 10,
  },
  subtitle: {
    marginBottom: 20,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    width: '100%',
    backgroundColor: 'transparent',
  },
  inputLabel: {
    position: 'absolute',
    top: -10,
    left: 10,
    backgroundColor: '#fff',
    paddingHorizontal: 5,
    fontSize: 12,
    color: '#666',
  },
  inputRequired: {
    position: 'absolute',
    top: -10,
    right: 10,
    fontSize: 12,
    color: '#666',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkbox: {
    marginRight: 10,
  },
  checkboxLabel: {
    fontSize: 12,
  },
  button: {
    backgroundColor: '#4a90e2',
    padding: 15,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
  },
  footerLink: {
    flex: 1,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 11,
    color: '#4a90e2',
    opacity: 0.6,
  },
});

export default LoginScreen;