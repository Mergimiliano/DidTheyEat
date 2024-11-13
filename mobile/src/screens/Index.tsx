import React from 'react';
import { View, Text } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';

export default function Index() {
  const { container, title } = useTheme();

  return (
    <View style={container}>
      <Text style={title}>Test</Text>
    </View>
  );
}
