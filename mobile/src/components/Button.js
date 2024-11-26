import React, { useState } from 'react';
import { TouchableOpacity, Text, StyleSheet} from 'react-native';

export default function Button({ onPress, title }) {
  const [pressed, setPressed] = useState(false);

  const handlePressIn = () => setPressed(true);
  const handlePressOut = () => setPressed(false);

  return (
    <TouchableOpacity
      style={[styles.button, pressed && styles.buttonActive]}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={onPress}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    display: 'inline-block',
    position: 'relative',
    marginBottom: 14,
    borderWidth: 2,
    borderColor: 'currentColor',
    borderRadius: 16,
    boxShadow: '0 6px 0 rgba(0, 0, 0, 0.1)',
    backgroundColor: '#fff',
    paddingVertical: 14,
    paddingHorizontal: 30,
    textAlign: 'center',
    color: '#183153',
    fontWeight: '600',
    cursor: 'pointer',
    userSelect: 'none',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontFamily: 'Satoshi-Medium, sans-serif',
    fontSize: 16,
    color: '#183153',
  },
  buttonActive: {
    backgroundColor: '#e2ae86',
    borderColor: '#ffb71a',
  },
});
