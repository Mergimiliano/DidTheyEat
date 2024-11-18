import React from 'react';
import { View, Text, Button, TouchableOpacity } from 'react-native';

export default function GetStarted({ navigation }) {
  return (
    <View>
      <Text>Welcome to the app! Get Started</Text>
      <Button title="Get Started" onPress={() => navigation.navigate('Register')} />
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={{ color: 'blue', marginTop: 10 }}>Already have an account? Login</Text>
      </TouchableOpacity>
    </View>
  );
}
