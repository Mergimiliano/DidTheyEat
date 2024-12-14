import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import CommunityList from './CommunityList';
import CommunityDetails from './CommunityDetails';
import Header from '../components/Header';

const Stack = createStackNavigator();

export default function Communities() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="CommunityList" component={CommunityList} options={{headerShown: false}}/>
      <Stack.Screen name="CommunityDetails" component={CommunityDetails}  options={{
          headerShown: true,
          header: ({ navigation, route }) => <Header navigation={navigation} route={route} />,
        }} />
    </Stack.Navigator>
  );
}