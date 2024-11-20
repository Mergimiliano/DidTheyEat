import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as Keychain from 'react-native-keychain';
import Communities from './src/screens/Communities';
import GetStarted from './src/screens/GetStarted';
import Register from './src/screens/Register';
import Login from './src/screens/Login';
import Profile from './src/screens/Profile';
import { useNavigation } from '@react-navigation/native';
import { refreshToken } from './src/services/tokenService';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const AppTabs = () => (
  <Tab.Navigator>
    <Tab.Screen name="Communities" component={Communities} />
    <Tab.Screen name="Profile" component={Profile} />
  </Tab.Navigator>
);

export default function App() {
  const navigation = useNavigation();

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const tokens = await Keychain.getGenericPassword();
        if (tokens) {
          const refreshSuccess = await refreshToken(tokens.username);
          if (refreshSuccess) {
            navigation.replace('AppTabs'); 
          } else {
            navigation.replace('Login');
          }
        } else {
          navigation.replace('GetStarted')
        }
      } catch (error) {
        console.error('Error checking auth status:', error);
        navigation.replace('Login');
      }
    };

    checkAuthStatus();
  }, [navigation]);

  // TO DO LOADING

  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen name="GetStarted" component={GetStarted} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="AppTabs" component={AppTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
