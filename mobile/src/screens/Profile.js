import React from 'react';
import { View, Text, Button } from 'react-native';
import * as Keychain from 'react-native-keychain';
import axiosInstance from '../utils/axiosInstance';

export default function Profile({ navigation }) {

  const handleLogout = async () => {
    try {
      const tokens = await Keychain.getGenericPassword();
      
      if (!tokens) {
        alert('No tokens found');
        return;
      }

      const refreshToken = tokens.username;

      const response = await axiosInstance.post('http://10.0.2.2:8000/logout/', {
        refresh: refreshToken,
      });

      if (response.status === 200) {
        await Keychain.resetGenericPassword();

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
