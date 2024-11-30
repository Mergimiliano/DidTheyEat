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
import { refreshTokens } from './src/services/tokenService';
import { ActivityIndicator, View } from 'react-native';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const AppTabs = () => (
  <Tab.Navigator>
    <Tab.Screen name="Communities" component={Communities} />
    <Tab.Screen name="Profile" component={Profile} />
  </Tab.Navigator>
);

export default function App() {

  const [initialRoute, setInitialRoute] = useState(null);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const tokens = await Keychain.getGenericPassword();
        if (tokens) {
          const refreshToken = tokens.password;
          const refreshSuccess = await refreshTokens(refreshToken);
          if (refreshSuccess) {
            setInitialRoute('AppTabs');
          } else {
            setInitialRoute('Login');
          }
        } else {
          setInitialRoute('GetStarted');
        }
      } catch (error) {
        console.error('Error checking auth status:', error);
        setInitialRoute('Login');
      }
    };

    checkAuthStatus();
  }, []);

  if (!initialRoute) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={initialRoute} screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="GetStarted" component={GetStarted} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="AppTabs" component={AppTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
