import React, { useState } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity } from 'react-native';

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
        const response = await fetch('https://your-backend-api.com/token/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        });
        const data = await response.json();
  
        if (response.ok) {
          await storeTokens(data.accessToken, data.refreshToken);
          alert('Login successful!');
        } else {
          alert('Login failed. Please check your credentials.');
        }
      } catch (error) {
        console.error('Error during login:', error);
      }
  };

  return (
    <View>
      <Text>Login</Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Login" onPress={handleLogin} />
      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={{ color: 'blue', marginTop: 10 }}>Don't have an account? Register</Text>
      </TouchableOpacity>
    </View>
  );
}
