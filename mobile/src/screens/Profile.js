import React from 'react';
import { View, Text, Button } from 'react-native';
import * as Keychain from 'react-native-keychain';
import axiosInstance from '../utils/axiosInstance';

export default function Profile({ navigation }) {

  const handleLogout = async () => {
    try {
      const credentials = await Keychain.getInternetCredentials('refresh_token');
      
      if (!credentials) {
        alert('No tokens found');
        return;
      }

      const refreshToken = credentials.password;

      const response = await axiosInstance.post('/logout/', {
        refresh: refreshToken,
      });

      if (response.status === 200) {
        await Keychain.resetInternetCredentials('access_token');
        await Keychain.resetInternetCredentials('refresh_token');
        alert('Logout successful!');
        navigation.reset({
          index: 0,
          routes: [{ name: 'GetStarted' }],
        });
      } else {
        alert('Logout failed.');
      }
    } catch (error) {
      console.error('Error during logout:', error);
      alert('Error during logout. Please try again.');
    }
  };

  return (
    <View>
      <Text>Profile</Text>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
}
