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
import { ActivityIndicator, View, Text } from 'react-native';
import { colors, style } from './src/styles/style';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPeopleGroup, faGear } from '@fortawesome/free-solid-svg-icons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const AppTabs = () => (
  <Tab.Navigator screenOptions={{
    headerShown: false,
    tabBarActiveTintColor: colors.yellow,
    tabBarInactiveTintColor: colors.offWhite,
    tabBarStyle: style.tab,
    tabBarIconStyle: style.tabIcon,
    tabBarLabelPosition: 'below-icon',
  }}>
    <Tab.Screen 
      name="Communities" 
      component={Communities} 
      options={{
        tabBarIcon: ({ color }) => (
          <FontAwesomeIcon icon={faPeopleGroup} size={hp('6%')} color={color} />
        ),
        tabBarLabel: ({ focused }) => (
          <Text 
            style={{
              color: focused ? colors.yellow : colors.offWhite,
              fontSize: wp('3.5%'),
              fontWeight: 800,
              textAlign: 'center',
            }}
          >
            Communities
          </Text>
        ),
      }}
    />
    <Tab.Screen 
      name="Profile" 
      component={Profile} 
      options={{
        tabBarIcon: ({ color, size }) => (
          <FontAwesomeIcon icon={faGear} size={hp('4%')} color={color} />
        ),
        tabBarLabel: ({ focused }) => (
          <Text 
            style={{
              color: focused ? colors.yellow : colors.offWhite,
              fontSize: wp('3.5%'),
              fontWeight: 800,
              textAlign: 'center',
            }}
          >
            Profile
          </Text>
        ),
      }}
    />
  </Tab.Navigator>
);


export default function App() {

  const [initialRoute, setInitialRoute] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const tokens = await Keychain.getInternetCredentials('refresh_token');
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

    checkAuth();
  }, []);

  if (!initialRoute) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={colors.yellow} />
      </View>
    );
  }

  return (
    <GestureHandlerRootView style={{flex: 1}}>
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
    </GestureHandlerRootView>
  );
}
