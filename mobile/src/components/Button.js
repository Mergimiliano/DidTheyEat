import React, { useState } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { colors } from '../styles/style';

export default function Button({ onPress, title, color = colors.yellow }) {
  const [pressed, setPressed] = useState(false);

  const handlePressIn = () => setPressed(true);
  const handlePressOut = () => setPressed(false);

  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: pressed ? `${color}AA` : color, borderColor: color }]}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: wp('60%'), // 60% of the screen width
    height: hp('6%'), // 7% of the screen height
    marginBottom: hp('2%'), // 2% of the screen height
    borderWidth: 2,
    borderColor: colors.yellow,
    borderRadius: wp('4%'), // 4% of the screen width
    backgroundColor: colors.yellow,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: hp('1%') }, // Dynamic shadow height
    shadowOpacity: 0.1,
    shadowRadius: wp('2%'), // Dynamic shadow radius
    elevation: 4, // Android shadow
  },
  buttonActive: {
    backgroundColor: colors.lightYellow,
    shadowOffset: { width: 0, height: hp('0.5%') },
    elevation: 2,
  },
  buttonText: {
    fontSize: wp('4%'), // 4% of the screen width
    fontWeight: 800,
    color: colors.navy,
  },
});
