import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { style, colors } from '../styles/style';

export default function GetStarted({ navigation }) {
  return (
    <View style={[style.container, { backgroundColor: colors.yellow }]}>
      <Text style={[style.textHeading]}>
        Welcome to the app! Get Started
      </Text>

      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <CustomButton
        title="Get Started"
        onPress={() => console.log('Button Pressed')}
      />
    </View>

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={style.textAccent}>Already have an account? Login</Text>
      </TouchableOpacity>
    </View>
  );
}
