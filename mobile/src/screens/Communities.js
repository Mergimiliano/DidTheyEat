import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import CommunityList from './CommunityList';
import CommunityDetails from './CommunityDetails';
import { TouchableOpacity, Text } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { colors } from '../styles/style';

const Stack = createStackNavigator();

export default function Communities() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="CommunityList" component={CommunityList} options={{headerShown: false}}/>
      <Stack.Screen name="CommunityDetails" component={CommunityDetails}  options={({ navigation, route }) => ({
          headerShown: true,
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginLeft: 16 }}>
              <FontAwesomeIcon icon={faArrowLeft} size={40} color="white" />
            </TouchableOpacity>
          ),
          headerTitle: () => (
            <Text style={{ color: 'white', fontSize: 40, fontWeight: 'bold', textAlign: 'center' , marginBottom:hp('1%')}}>
              {route.params?.community?.name || 'Community Details'}
            </Text>
          ),
          headerStyle: {
            backgroundColor: colors.navy, height: hp('8%')
          },
          headerTitleAlign: 'center',
        })} 
      />
    </Stack.Navigator>
  );
}