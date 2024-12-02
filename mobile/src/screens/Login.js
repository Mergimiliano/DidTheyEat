import React, { useState } from 'react';
import { Text, TextInput, Button, TouchableOpacity, ImageBackground, SafeAreaView } from 'react-native';
import { style } from '../styles/style';
import * as Keychain from 'react-native-keychain';
import axios from 'axios';

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const saveTokens = async (accessToken, refreshToken) => {
    try {
      await Keychain.setInternetCredentials('access_token', 'access', accessToken);
      console.log('Access token saved successfully.');

      await Keychain.setInternetCredentials('refresh_token', 'refresh', refreshToken);
      console.log('Refresh token saved successfully.');
    } catch (error) {
      console.error('Error saving tokens:', error);
      Alert.alert('Error', 'Could not save tokens');
    }
  };
  

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://10.0.2.2:8000/token/', {
        email,
        password,
      });

      if (response.status === 200) {
        const { access, refresh } = response.data;

        await saveTokens(access, refresh);

        alert('Login successful!');
        
        navigation.reset({
          index: 0,
          routes: [{ name: 'AppTabs' }],
        });
      } else {
        alert('Login failed. Please check your credentials.');
      }
    } catch (error) {
      console.error('Error during login:', error);
      alert('Error during login. Please try again.');
    }
  };

  return (
    <SafeAreaView>
      <ImageBackground
        source={require('../assets/background-form.png')}
        resizeMode="cover"
        style={style.background}>

        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <Button title="Login" onPress={handleLogin} />
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={style.link}>Don't have an account? Register</Text>
        </TouchableOpacity>
      </ImageBackground>
    </SafeAreaView>
  );
}